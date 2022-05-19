const express = require('express')
const app = express()
const port = 3000

const user = require('./routes/user/user.js')
const todo = require('./routes/todos/todos.js')
const auth = require('./routes/auth/auth.js')

var bodyParser = require('body-parser')
const { use } = require('express/lib/router')

app.use(express.raw());

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.post('/register', auth.register)

app.get('/user', user.getAllUsers)

app.get('/user/todos', user.getUserTodos)

app.get('/users/:id', user.getUserById)

app.delete('/users/:id', user.deleteUser)

app.post('/todos', todo.addTodoPlayer)

app.put('/users/:id', user.updateUser)

app.get('/todos', todo.getAllTodosList)

app.delete('/todos/:id', todo.delTodoById)

app.get('/todos/:id', todo.getTodoById)

app.put('/todos/:id', todo.updateTodoById)

app.listen(port, () => {
    console.log('Example app listening on port ' + port)
})
