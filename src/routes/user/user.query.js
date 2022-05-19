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

async function deleteUserDb(id, res) {
    db.execute('DELETE FROM `user` WHERE id = ?', [id], function(err, results, fields) {
        if (err) throw err;
        res.status(200).json({results});
    })
}

module.exports = {
    addUser,
    deleteUserDb,
    checkUserExist
}