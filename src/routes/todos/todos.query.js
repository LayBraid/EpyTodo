const db = require('../../config/db');

async function checkTodoExistById(id) {
    return (await (await db).execute('SELECT * FROM `todo` WHERE id = ?', [id]))[0].length > 0;
}

async function oneTodoIsCreate() {
    return (await (await db).execute('SELECT * FROM `todo` WHERE status = ?', ['create']))[0].length > 0;
}

async function checkTodoExist(title) {
    return (await (await db).execute('SELECT * FROM `todo` WHERE title = ?', [title]))[0].length > 0;
}

async function addTodo(title, description, due_time, user_id) {
    try {
        await (await db).execute('INSERT INTO `todo` (title, description, due_time, user_id) VALUES (?, ?, ?, ?)', [title, description, due_time, user_id]);
        return true;
    } catch (e) {
        return false;
    }
}

async function getAllTodos() {
    try {
        return (await (await db).execute('SELECT * FROM `todo`'))[0];
    } catch (e) {
        return "500: Internal Server Error";
    }
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
    try {
        return (await (await db).execute('SELECT * FROM `todo` WHERE id = ?', [id]))[0];
    } catch (e) {
        return "500: Internal Server Error";
    }
}

module.exports = {
    addTodo,
    checkTodoExist,
    oneTodoIsCreate,
    getAllTodos,
    checkTodoExistById,
    delTodoId,
    getTodoId
}