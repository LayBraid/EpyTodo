const db = require('../../config/db');
const jwt = require('jsonwebtoken');

async function checkUserExist(mail) {
    return (await (await db).execute('SELECT * FROM `user` WHERE email = ?', [mail]))[0].length > 0;
}

async function addUser(name, mail, firstname, password) {
    try {
        await (await db).execute('INSERT INTO `user` (name, email, firstname, password) VALUES (?, ?, ?, ?)', [name, mail, firstname, password]);
        return true;
    } catch (e) {
        return false;
    }
}

async function getAllUsersDb() {
    return (await (await db).execute('SELECT * FROM `user`'))[0];
}

async function getUserByIdDb(id) {
    let param = "id";
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(id)) {
        if (await checkUserExist(id) === true) {
            param = "email";
            id = '\'' + id + '\''
        }
    }
    const sql = 'SELECT * FROM `user` WHERE ' + param + ' = ' + id
    return (await (await db).execute(sql))[0];
}

async function deleteUserDb(id, res) {
    db.execute('DELETE FROM `user` WHERE id = ?', [id], function(err, results, fields) {
        if (err) throw err;
        res.status(200).json({results});
    })
}

module.exports = {
    addUser,
    deleteUserDb,
    checkUserExist,
    getAllUsersDb,
    getUserByIdDb,
}