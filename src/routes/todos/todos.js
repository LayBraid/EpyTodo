const {addTodo, checkTodoExist, oneTodoIsCreate, getAllTodos, checkTodoExistById, delTodoId} = require('./todos.query');

async function addTodoPlayer(rec, res){
    const title = rec.body.title;
    const description = rec.body.description;
    const due_time = rec.body.due_time;
    const user_id = rec.body.user_id;
    const status = rec.body.status;
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

async function getAllTodosList(rec, res){
    if (await oneTodoIsCreate() === false) {
        res.status(400).json({error: "No todo"})
    } else {
        return getAllTodos()
    }
}

async function delTodoById(rec, res){
    const id = rec.params.id;
    if (await checkTodoExistById(id) === false) {
        res.status(400).json({error: "Todo not exist"})
    } else {
        if (await delTodoId(id)) {
            res.status(200).json({success: "Todo deleted"})
        } else {
            res.status(400).json({error: "Todo not deleted"})
        }
    }
}

module.exports = {
    addTodoPlayer,
    getAllTodosList,
    delTodoById
}