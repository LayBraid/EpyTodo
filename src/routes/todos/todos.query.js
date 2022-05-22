const { status } = require('express/lib/response');
const db = require('../../config/db');

async function checkTodoExist(title) {
    return (await (await db).execute('SELECT * FROM `todo` WHERE title = ?', [title]))[0].length > 0;
}

async function checkTodoExistId(id) {
    return (await (await db).execute('SELECT * FROM `todo` WHERE id = ?', [id]))[0].length > 0;
}

async function addTodo(title, description, due_time, user_id, status) {
    try {
        await (await db).execute('INSERT INTO `todo` (title, description, due_time, user_id, status) VALUES (?, ?, ?, ?, ?)', [title, description, due_time, user_id, status]);
        return true;
    } catch (e) {
        return false;
    }
}

async function getAllTodos() {
    return (await (await db).execute('SELECT * FROM `todo`'))[0];
}

async function getLastTodoAdded() {
    return (await (await db).execute('SELECT * FROM `todo` ORDER BY id DESC LIMIT 1'))[0];
}

async function delTodoId(id) {
    try {
        await (await db).execute('DELETE FROM `todo` WHERE id = ?', [id]);
        return true;
    } catch (e) {
        return false;
    }
}

async function getTodoId(id) {
    return (await (await db).execute('SELECT * FROM `todo` WHERE id = ?', [id]))[0];
}

async function getTodoByUserId(id) {
    return (await (await db).execute('SELECT * FROM `todo` WHERE user_id = ?', [id]))[0];
}

async function updateTodoId(id, title, description, due_time, user_id, status) {
    try {
        await (await db).execute('UPDATE `todo` SET title = ?, description = ?, due_time = ?, user_id = ?, status = ? WHERE id = ?', [title, description, due_time, user_id, status, id]);
        return true;
    } catch (e) {
        return false;
    }
}

module.exports = {
    addTodo,
    checkTodoExist,
    getAllTodos,
    delTodoId,
    getTodoId,
    updateTodoId,
    checkTodoExistId,
    getTodoByUserId,
    getLastTodoAdded
}