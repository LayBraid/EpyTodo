const {getTodoId} = require("../routes/todos/todos.query");
const {getUserById} = require("../routes/user/user.query")
const db = require('../config/db')

async function userExists(req, res, next) {
    if (req.body.email !== undefined && req.params.id === undefined)
        req.id = req.body.email
    if (req.id === undefined) {
        if (req.params.id === undefined) {
            return res.status(400).json({error: "Bad parameter"})
        } else {
            req.id = req.params.id
        }
    }
    const user = await getUserById(req.id);
    if (user === null)
        return res.status(400).json({error: "Bad parameter"})
    if (user.length > 0) {
        next();
    } else {
        return res.status(404).json({error: "Not found"})
    }
}

async function notFoundTodo(req, res, next) {
    const id = req.params.id;
    if (id === undefined) {
        res.status(400).json({error: "Bad parameter"})
    }
    const todoId = await getTodoId(id);
    if (todoId === null) {
        return res.status(400).json({error: "Bad parameter"})
    }
    if (todoId.length > 0) {
        next();
    } else {
        res.status(400).json({error: "Not found"})
    }
}

module.exports = {
    notFoundTodo,
    userExists,
}