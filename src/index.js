const express = require('express')
const app = express()
const port = 3000

const user = require('./routes/user/user.js')
const todo = require('./routes/todos/todos.js')

const auth = require('./middleware/auth');
const {notFoundTodo} = require('./middleware/notFound');

var bodyParser = require('body-parser')

app.use(express.raw());

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.post('/register', auth, user.register)
app.delete('/user/:id', auth, user.deleteUser)

app.post('/todos', auth, todo.addTodoPlayer)
app.get('/todos', auth, todo.getAllTodosList)
app.delete('/todos/:id', auth, notFoundTodo, todo.delTodoById)
app.get('/todos/:id', auth, notFoundTodo, todo.getTodoById)
app.put('/todos/:id', auth, notFoundTodo, todo.updateTodoById)

app.listen(port, () => {
    console.log('Example app listening on port ' + port)
})
