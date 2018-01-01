let mysql = require('mysql');

function OptPool() {
    this.flag = true;
    this.pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'test',
        port: '3306'
    });

    this.getPool = function () {
        if (this.flag) {
            this.pool.on('connection', (connection) => {
                connection.query('SET SESSION auto_increment_increme');
                this.flag = false;
            })
        }
        return this.pool;
    }
}

module.exports = OptPool;