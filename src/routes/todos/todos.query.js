const db = require('../../config/db');

async function checkTodoExist(title) {
    db.execute('SELECT * FROM `todo` WHERE title = ?', [title], function(err, results, fields) {
        if (err) throw err;
        return results.length > 0;
    })
}

async function addTodo(title, description, due_time, user_id, status, res) {
    db.execute('INSERT INTO `todo` (title, description, due_time, user_id, status) VALUES (?, ?, ?, ?, ?)', [title, description, due_time, user_id, status], function(err, results, fields) {
        if (err) throw err;
        res.status(200).json({results});
    })
}

module.exports = {
    addTodo,
    checkTodoExist
}