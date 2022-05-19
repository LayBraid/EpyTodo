const db = require('../../config/db');

async function checkTodoExist(title) {
    return (await (await db).execute('SELECT * FROM `todo` WHERE title = ?', [title]))[0].length > 0;
}

async function addTodo(title, description, due_time, user_id, res) {
    try {
        await (await db).execute('INSERT INTO `todo` (title, description, due_time, user_id) VALUES (?, ?, ?, ?)', [title, description, due_time, user_id]);
        return true;
    } catch (e) {
        return false;
    }
}

module.exports = {
    addTodo,
    checkTodoExist
}