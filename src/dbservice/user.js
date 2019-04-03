import {
    db
} from './init';


export const createUser = (firstName, lastName, email) => new Promise((resolve, reject) =>
    db.run('insert into user(firstName,lastName,email) values(?,?,?)', [firstName, lastName, email], function (err) {
        return err ? reject(err) : resolve(this.lastID);
    }));

export const updateUser = (firstName, lastName, email, userId) => new Promise((resolve, reject) =>
    db.run(`update into user set firstName=?, lastName=?, email=? where userId=?`, [firstName, lastName, email, userId], err => err ? reject(err) : resolve()));

export const selectUser = (queryParam = {}) => new Promise(
    (resolve, reject) => {
        let query = `select * from user where 1=1`;
        const userQuerySelector = {
            userId: value => ` and id = ${value}`,
            firstName: value => ` and firstName like '%${value}%'`,
            lastName: value => ` and lastName like '%${value}%'`,
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
