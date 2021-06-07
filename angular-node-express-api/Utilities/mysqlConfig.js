var config = require("./config").config;
var mysql = require('mysql');
console.log(config.DB_URL_MYSQL.host,
    config.DB_URL_MYSQL.user,
    config.DB_URL_MYSQL.password,
    config.DB_URL_MYSQL.database)
var connection = mysql.createConnection({
    host: config.DB_URL_MYSQL.host,
    user: config.DB_URL_MYSQL.user,
    password: config.DB_URL_MYSQL.password,
    database: config.DB_URL_MYSQL.database,
});

connection.connect(() => {
    require('../Models/Task').initialize();
    require('../Models/User').initialize();
    require('../Models/Project').initialize();
});

let getDB = () => {
    return connection;
}

module.exports = {
    getDB: getDB
}