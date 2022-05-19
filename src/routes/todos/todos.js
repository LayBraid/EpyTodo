const {addTodo, checkTodoExist} = require('./todos.js');

async function addTodoPlayer(rec, res){
    const title = rec.body.title;
    const description = rec.body.description;
    const due_time = rec.body.due_time;
    const user_id = rec.body.user_id;
    const status = rec.body.status;
    if (await checkTodoExist(title)) {
        await addTodo(title, description, due_time, user_id, status, res);
    } else {
        res.status(400).json({error: "Todo already exist"})
    }
}

module.exports = {
    addTodoPlayer
}