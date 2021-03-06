const {
    addTodo,
    checkTodoExist,
    getAllTodos,
    delTodoId,
    getTodoId,
    updateTodoId,
    getLastTodoAdded,
} = require('./todos.query');
const {notFoundTodo} = require("../../middleware/notFound")
const auth = require("../../middleware/auth");

//TODO get todo check if user is in db

//user db

async function todo(app) {
    app.post('/todos', async function addTodoPlayer(req, res) {
        const title = req.body.title;
        const description = req.body.description;
        const due_time = req.body.due_time;
        const user_id = req.body.user_id;
        const status = req.body.status;

        if (title === undefined || description === undefined || due_time === undefined || user_id === undefined || status === undefined)
            res.status(400).json({msg: "Bad request"})
        if (await checkTodoExist(title) === false) {
            if (await addTodo(title, description, due_time, user_id, status)) {
                const todo = await getLastTodoAdded();
                res.status(201).json(todo)
            } else {
                res.status(400).json({msg: "Todo not added"})
            }
        } else {
            res.status(400).json({msg: "Todo already exist"})
        }
    });

    app.get('/todos', auth, async function getAllTodosList(req, res) {
        try {
            const allTodos = await getAllTodos();
            res.status(200).json(allTodos)
        } catch (e) {
            res.status(500).json({msg: "Internal Server Error"})
        }
    });

    app.delete("/todos/:id", auth, notFoundTodo, async function delTodoById(req, res) {
        const id = req.params.id;
        await delTodoId(id)
        res.status(200).json({msg: "Successfully deleted recorder number: ${id}"})
    });

    app.get('/todos/:id', auth, notFoundTodo, async function getTodoById(req, res) {
        const id = req.params.id;
        const todoId = await getTodoId(id);
        res.status(200).json(todoId)
    });

    app.put('/todos/:id', auth, notFoundTodo, async function updateTodoById(req, res) {
        const id = req.params.id;
        const title = req.body.title;
        const description = req.body.description;
        const due_time = req.body.due_time;
        const user_id = req.body.user_id;
        const status = req.body.status;
        if (id === undefined || title === undefined || description === undefined || due_time === undefined || user_id === undefined || status === undefined)
            res.status(400).json({msg: "Bad request"})
        await updateTodoId(id, title, description, due_time, user_id, status)
        const todo = await getTodoId(id)
        res.status(200).json(todo)
    });
}

module.exports = todo