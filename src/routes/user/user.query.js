const db = require('../../config/db');
const jwt = require('jsonwebtoken');

async function checkUserExist(id) {
    let param = "id"
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(id)) {
        param = "email"
        id = '\'' + id + '\''
    }
    const sql = 'SELECT * FROM `user` WHERE ' + param + ' = ' + id
    return (await (await db).execute(sql))[0].length > 0;
}

async function addUser(name, mail, firstname, password) {
    try {
        await (await db).execute('INSERT INTO `user` (name, email, firstname, password) VALUES (?, ?, ?, ?)', [name, mail, firstname, password]);
        return true;
    } catch (e) {
        return false;
    }
}

async function updateUserDb(name, mail, firstname, password, id) {
    try {
        await (await db).execute('UPDATE `user` SET name = ?, email = ?, firstname = ?, password = ? WHERE id = ?', [name, mail, firstname, password, id]);
        return true;
    } catch (e) {
        return false;
    }
}

async function getUserTodosDb(id) {
    const sql = 'SELECT * FROM `todos` WHERE user_id = ' + id
    return (await (await db).execute(sql))[0];
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

async function deleteUserDb(id) {
    if (await checkUserExist(id) === false) {
        return false;
    }
    try {
        await (await db).execute('DELETE FROM `user` WHERE id = ?', [id]);
        return true;
    } catch (e) {
        return false;
    }
}


module.exports = {
    addUser,
    deleteUserDb,
    checkUserExist,
    getAllUsersDb,
    getUserByIdDb,
    updateUserDb,
    getUserTodosDb,
}