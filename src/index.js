const express = require('express')
const app = express()
const port = 3000

const user = require('./routes/user/user.js')
const todo = require('./routes/todos/todos.js')
const auth = require('./routes/auth/auth.js')

const auth_check = require('./middleware/auth');
const {notFoundTodo} = require('./middleware/notFound');

var bodyParser = require('body-parser')

app.use(express.raw());

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

//Todo login, get user todo and token

//app.post('/login', auth.login)
app.post('/register', auth.register)

app.put('/user/:id', user.updateUser)
app.get('/user/:id', user.getUserById)
app.delete('/user/:id', user.deleteUser)
app.get('/user', user.getCurrentUser)
//app.get('/user/todos/', auth_check, user.getTodoCurrentUser)

app.post('/todos', todo.addTodoPlayer)
app.get('/todos', todo.getAllTodosList)
app.delete('/todos/:id', notFoundTodo, todo.delTodoById)
app.get('/todos/:id', notFoundTodo, todo.getTodoById)
app.put('/todos/:id', notFoundTodo, todo.updateTodoById)

app.listen(port, () => {
    console.log('Example app listening on port ' + port)
})
