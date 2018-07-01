const sql = require('../sql/sql');
const moment = require('moment');
const func = require('../sql/func');

function formatData(rows) {
    return rows.map(row => {
        const date = moment(row.create_time).format('YYYY-MM-DD');
        return Object.assign({}, row, {create_time: date});
    });
}


module.exports = {
    // 获取列表
    fetchAll (req, res) {
	console.log(">>> get hospital list...");
	
        func.connPool(sql.queryAll, 'hospital', (err, rows) => {
            if (err) {
                res.json({code: 500, msg: 'DB error', err: err});
            } else {
                rows = formatData(rows);
                res.json({code: 200, msg: 'ok', hospital: rows});
            }
        });
	
    },

    // 获取详情
    fetchById (req, res) {
        const id = req.body.id;
	console.log(`hospital.fetchByID> get id = ${id}`);
	
        func.connPool(sql.queryById, ['hospital', id], (err, rows) => {
            if (err) {
                res.json({code: 500, msg: 'DB error', err: err});
		return;
            } 

	    if (!rows || rows.length === 0) {
		res.json({code: 400, msg: 'Invalid hospital ID'});
		return;
	    }
	    
            rows = formatData(rows);
            res.json({code: 200, msg: 'ok', hospital: rows[0]});
        });
	
    },

    // 添加|更新
    addOne (req, res) {
        const id = req.body.id;
        const name = req.body.name;
        const abbrev = req.body.abbrev;
	const city = req.body.city;
        let query, arr;

        if (id) {
            // 更新
            query = 'UPDATE hospital SET name=?, abbrev=?, city=? WHERE id=?';
            arr = [name, abbrev, city, id];
        } else {
            // 新增
            query = 'INSERT INTO hospital(name, abbrev, city) VALUES(?,?,?)';
            arr = [name, abbrev, city];
        }

        func.connPool(query, arr, (err, rows) => {
	    if (err) {
		res.json({code: 500, msg: 'DB error', err: err});
	    } else {
		res.send({code: 200, msg: 'done'});
	    }
        });

    },


    // 删除
    deleteOne (req, res) {
        const id = req.body.id;

        func.connPool(sql.del, ['hospital', id], (err, rows) => {
	    if (err) {
		res.json({code: 500, msg: 'DB error', err: err});
	    } else {
		res.send({code: 200, msg: 'done'});
	    }
        });
	
    },

    // 批量删除
    deleteMulti (req, res) {
        const id = req.body.id;

        func.connPool('DELETE FROM hospital WHERE id IN ?', [[id]], (err, rows) => {
	    if (err) {
		res.json({code: 500, msg: 'DB error', err: err});
	    } else {
		res.send({code: 200, msg: 'done'});
	    }
        });
	
    },

};
