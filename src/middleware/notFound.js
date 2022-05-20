const {getTodoId} = require("../routes/todos/todos.query");

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
    notFoundTodo
}