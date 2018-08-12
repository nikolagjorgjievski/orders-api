/* Load modules */
let sqlite3 = require('sqlite3').verbose();

/*
 * Database configuration
 */

/* Load database file (Creates file if not exists) */
let db = new sqlite3.Database('./sqlite.db');

/* Init tables if they don't exist */
let init = function () {
    db.run("CREATE TABLE if not exists customers (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT," +
        " name TEXT," +
        " address TEXT" +
        ")");

    db.run("CREATE TABLE if not exists orders (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT," +
        " customerId INTEGER," +
        " item TEXT," +
        " price NUMERIC," +
        " currency TEXT," +
        " FOREIGN KEY(customerId) REFERENCES customers(id)" +
        ")");
};

module.exports = {
    init: init,
    db: db
};