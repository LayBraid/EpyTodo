const {getTodoId} = require("../routes/todos/todos.query");
const {getUserById} = require("../routes/user/user.query")
const db = require('../config/db')

async function userExists(req, res, next) {
    if (req.id === undefined) {
        if (req.params.id === undefined) {
            return res.status(400).json({error: "Bad request"})
        } else {
            req.id = req.params.id
        }
    }
    const user = await getUserById(req.id);
    if (user.length > 0) {
        next();
    } else {
        return res.status(404).json({error: "User doesn't exist"})
    }
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
    userExists,
}