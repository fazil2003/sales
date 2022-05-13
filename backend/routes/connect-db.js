const mysql = require('mysql');

var db_config = {
    host            :   'localhost',
    user            :   'root',
    password        :   '',
    database        :   'sales',
    connectTimeout  :   10000 
};

var pool  = mysql.createPool(db_config);

pool.getConnection(function(err, connection) {
    console.log("MySql Connected");
});

pool.on('error', function(err) {
    console.log(err.code);
});

module.exports = pool;