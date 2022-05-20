const {getTodoId} = require("../routes/todos/todos.query");
const db = require('../config/db')

async function user(req, res, next) {
    const id = req.params.id;

    if (id === undefined)
        res.status(400).json({error: "Bad request"})
    try {
        let sql = "SELECT * FROM user WHERE id = " + id;
        const user = (await (await db).execute(sql))[0]
        if (user.length > 0) {
            next();
        } else {
            res.status(404).json({error: "User not found"})
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({error: "Internal Server Error"})
    }
    next();
}

async function notFoundTodo(req, res, next) {
    const id = req.params.id;

    const todoId = getTodoId(id);

    if (todoId.length > 0) {
        next();
    } else {
        res.status(400).json({error: "Todo not exist"})
    }
}

module.exports = {
    notFoundTodo,
    user
}