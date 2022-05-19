const {addTodo, checkTodoExist} = require('./todos.query');

async function addTodoPlayer(rec, res){
    const title = rec.body.title;
    const description = rec.body.description;
    const due_time = rec.body.due_time;
    const user_id = rec.body.user_id;
    const status = rec.body.status;
    if (await checkTodoExist(title) === false) {
        if (await addTodo(title, description, due_time, user_id, status, res)) {
            res.status(200).json({success: "Todo added"})
        } else {
            res.status(400).json({error: "Todo not added"})
        }
    } else {
        res.status(400).json({error: "Todo already exist"})
    }
}

module.exports = {
    addTodoPlayer
}