let OptPool = require('./OptPool');

let optPool = new OptPool();
let pool = optPool.getPool();

// 从连接池中获取一个连接
pool.getConnection((error, connection) => {
    // 向数据库插入数据
    let userAddSql = 'insert into user (uname,pwd) values(?,?)';
    let param = ['Zzz', '080612'];

    connection.query(userAddSql, param, (error, result) => {
        if (error) {
            console.log('insert err: ' + error.message);
            return;
        }
        console.log('insert success');
        connection.release();
    });
});
