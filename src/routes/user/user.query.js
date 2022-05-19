const db = require('../../config/db');
const jwt = require('jsonwebtoken');

async function checkUserExist(mail, res) {
    db.execute('SELECT * FROM `user` WHERE email = ?', [mail], function(err, results, fields) {
        if (err) throw err;
        return results.length > 0;
    })
}

async function addUser(name, mail, firstname, password, res) {
    db.execute('INSERT INTO `user` (email, password, name, firstname) VALUES (?, ?, ?, ?)', [mail, password, name, firstname], function(err, results, fields) {
        const token = jwt.sign({email:mail, password:password}, 'SECRET');
        console.log("User added: " + mail);
        res.status(200).json({token});
    })
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