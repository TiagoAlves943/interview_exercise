import {
    db
} from './init';


export const createUser = (givenName, familyName, email) => new Promise((resolve, reject) =>
    db.run('insert into user(givenName,familyName,email) values(?,?,?)', [givenName, familyName, email], function (err) {
        return err ? reject(err) : resolve(this.lastID);
    }));

export const updateUser = (givenName, familyName, email, userId) => new Promise((resolve, reject) =>
    db.run(`update user set givenName=?, familyName=?, email=? where id=?`, [givenName, familyName, email, userId], err => err ? reject(err) : resolve()));

export const selectUser = (queryParam = {}) => new Promise(
    (resolve, reject) => {
        let query = `select * from user where 1=1`;
        const userQuerySelector = {
            id: value => ` and id = ${value}`,
            givenName: value => ` and givenName like '%${value}%'`,
            familyName: value => ` and familyName like '%${value}%'`,
            email: value => ` and email like '%${value}%'`,
        };
        Object.keys(queryParam).forEach(key => {
            query += userQuerySelector.hasOwnProperty(key) ? userQuerySelector[key](queryParam[key]) : '';
        });
        db.all(query, [], (err, rows) => {
            if (err) {
                return reject(err);
            }
            return resolve(rows);
        });
    }
);
