const sqlite3 = require('sqlite3').verbose();

// init the db
export const db = new sqlite3.Database(':memory:', err => {
    if (err) {
        throw err;
    }
});

// create the table of user;;
export const initDB = () => new Promise((resolve,reject) =>
    db.run('CREATE TABLE user(id INTEGER PRIMARY KEY,firstName varchar(30),lastName varchar(30), email varchar(30))', err => {
        if (err) {
            return  reject(err);
        }
        return resolve();
    }));
