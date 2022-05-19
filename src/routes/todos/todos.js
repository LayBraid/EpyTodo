const {
    addTodo,
    checkTodoExist,
    getAllTodos,
    delTodoId,
    getTodoId,
    updateTodoId,
    checkTodoExistId
} = require('./todos.query');

async function addTodoPlayer(req, res) {
    const title = req.body.title;
    const description = req.body.description;
    const due_time = req.body.due_time;
    const user_id = req.body.user_id;
    const status = req.body.status;
    if (await checkTodoExist(title) === false) {
        if (await addTodo(title, description, due_time, user_id, status)) {
            res.status(200).json({success: "Todo added"})
        } else {
            res.status(400).json({error: "Todo not added"})
        }
    } else {
        res.status(400).json({error: "Todo already exist"})
    }
}

async function getAllTodosList(req, res) {
    try {
        const allTodos = await getAllTodos();
        if (allTodos.length > 0) {
            res.status(200).json(allTodos)
        } else {
            res.status(400).json({error: "Todo not exist"})
        }
    } catch (e) {
        res.status(500).json({error: "Internal Server Error"})
    }

}

async function delTodoById(req, res) {
    const id = req.params.id;
    if (await checkTodoExistId(id) === false)
        res.status(400).json({error: "Todo not exist"})
    if (await delTodoId(id))
        res.status(200).json({success: "Todo deleted"})
    else
        res.status(400).json({error: "Todo not deleted"})
}

async function getTodoById(req, res) {
    const id = req.params.id;
    const todoId = await getTodoId(id);
    if (todoId.length > 0) {
        res.status(200).json(todoId)
    } else {
        res.status(400).json({error: "Todo not exist"})
    }
}

async function updateTodoById(req, res) {
    const id = req.params.id;
    const title = req.body.title;
    const description = req.body.description;
    const due_time = req.body.due_time;
    const user_id = req.body.user_id;
    const status = req.body.status;
    if (await updateTodoId(id, title, description, due_time, user_id, status))
        res.status(200).json({success: "Todo updated"})
    else
        res.status(400).json({error: "Todo not updated"})
}

module.exports = {
    addTodoPlayer,
    getAllTodosList,
    delTodoById,
    getTodoById,
    updateTodoById
}