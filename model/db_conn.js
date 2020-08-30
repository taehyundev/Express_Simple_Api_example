var mysql = require('mysql')
var config = require('./db_config')

module.exports= mysql.createConnection({
    host:config.mysql.host,
    port:config.mysql.port,
    user:config.mysql.username,
    password:config.mysql.password,
    database:config.mysql.db
})
