const mysql = require("mysql2");

var connection = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '0869976626',
    database: 'vacCenter',
    /////
    // port: '3306'
    /////
});

module.exports = connection;