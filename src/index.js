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
app.post('/register', auth_check, auth.register)

app.put('/user/:id', auth_check, user.updateUser)
app.get('/user/:id', auth_check, user.getUserById)
app.delete('/user/:id', auth_check, user.deleteUser)
app.get('/user', auth_check, user.getCurrentUser)
//app.get('/user/todos/', auth_check, user.getTodoCurrentUser)

app.post('/todos', auth_check, todo.addTodoPlayer)
app.get('/todos', auth_check, todo.getAllTodosList)
app.delete('/todos/:id', auth_check, notFoundTodo, todo.delTodoById)
app.get('/todos/:id', auth_check, notFoundTodo, todo.getTodoById)
app.put('/todos/:id', auth_check, notFoundTodo, todo.updateTodoById)

app.listen(port, () => {
    console.log('Example app listening on port ' + port)
})
