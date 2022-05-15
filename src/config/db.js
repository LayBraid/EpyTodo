const mysql = require('mysql')
require('dotenv').config()

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
    insecureAuth: true
})

connection.connect(function (err) {
    console.log('Connected to ' + process.env.MYSQL_DATABASE)
    if (err) throw err;
})

module.exports = connection;