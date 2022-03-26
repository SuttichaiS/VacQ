const mysql = require("mysql");

var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Jimmyjimmy60',
    database: 'vaccenter'
});

// console.log(connection)

module.exports = connection;