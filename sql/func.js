const mysql = require('mysql');
const db = require('../config').db;
const pool = mysql.createPool(db);

module.exports = {
    connPool (sql, val, cb) {
        pool.getConnection((err, conn) => {
            conn.query(sql, val, (err, rows) => {

                if (err) {
                    console.log(err);
                }

                cb(err, rows);

                conn.release();
            });
        });
    },

    // json格式
    writeJson(res, code = 200, msg = 'ok', data = null) {
        let obj = {code, msg, data};

        if (!data) {
            delete obj.data;
        }

        res.send(obj);
    },
};
