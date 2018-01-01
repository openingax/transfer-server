const MySql = require('mysql');

let connection = MySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test',
    port: '3306'
});

connection.connect((error) => {
   if (error) {
       console.log('[query] - :' + error.toString());
       return;
   }
   console.log('[connection connect] succeed!');
});

// 向数据库插入数据
let userAddSql = 'insert into user (uname,pwd) values(?,?)';
let param = ['cly184114@163.com','AZaz1108'];

connection.query(userAddSql,param,(error, result) => {
    if (error) {
        console.log('insert err: ' + error.message);
        return;
    }
    console.log('insert success');
});

// 向数据库查询数据
// connection.query('SELECT * from user where uid=?', [2], (error, rows, fields) => {       // 直接查询 uid 为 2 的数据
connection.query('SELECT * from user', (error, rows, fields) => {
    if (error) {
        console.log('[query] - :' + error);
        return;
    }

    for (let i=0;i< rows.length;i++) {
        console.log('The solution is:\nuid:' + rows[i].uid + " -- " + rows[i].uname + " -- " + rows[i].pwd);
    }
});

connection.end((error) => {
    if (error) {
        console.log('end error: ' + error.toString());
        return;
    }
    console.log('[connection end] succeed!');
});