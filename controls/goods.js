const sql = require('../sql/sql');
const moment = require('moment');
const func = require('../sql/func');
const path = require('path');

function formatData(rows) {
    return rows.map(row => {
        const date = moment(row.create_time).format('YYYY-MM-DD');
        return Object.assign({}, row, {create_time: date});
    });
}


module.exports = {
    // 获取商品列表
    fetchAll (req, res) {
        func.connPool(sql.queryAll, 'goods', rows => {
            rows = formatData(rows);
            res.json({code: 200, msg: 'ok', goods: rows});
        });
    },

    // 获取商品详情
    fetchById (req, res) {
        let id = req.body.id;

        func.connPool(sql.queryById, ['goods', id], rows => {
            rows = formatData(rows);
            res.json({code: 200, msg: 'ok', goods: rows[0]});
        });

    },

    // 添加|更新 商品
    addOne (req, res) {
        const id = req.body.id;
        // console.log(id);
        const name = req.body.name;
        const price = req.body.price;
        const query, arr;

        if (id) {
            // 更新
            query = 'UPDATE goods SET name=?, price=? WHERE id=?';
            arr = [name, price, id];
        } else {
            // 新增
            query = 'INSERT INTO goods(name, price) VALUES(?,?)';
            arr = [name, price];
        }

        func.connPool(query, arr, rows => {
            res.send({code: 200, msg: 'done'});

        });

    },


    // 删除商品
    deleteOne (req, res) {
        const id = req.body.id;

        func.connPool(sql.del, ['goods', id], rows => {
            res.send({code: 200, msg: 'done'});

        });

    },

    // 批量删除
    deleteMulti (req, res) {
        const id = req.body.id;

        func.connPool('DELETE FROM goods WHERE id IN ?', [[id]], rows => {
            res.send({code: 200, msg: 'done'});
        });

    },

    uploadGoodsImg (req, res) {
        const absolutePath = path.resolve(__dirname, req.file.path);

        func.connPool('UPDATE goods SET imgs = ? WHERE id = ?', [absolutePath, 60], (err, rows) => {
            res.send({code: 200, msg: 'done', url: absolutePath});
        }, res);
    },
};
