const express = require('express')
const app = express()
const port = 3000

const todo = require('./routes/todos/todos.js')

var bodyParser = require('body-parser')
const { use } = require('express/lib/router')

app.use(express.raw());

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

require('./routes/auth/auth')(app)
require('./routes/user/user')(app)
require('./routes/todos/todos')(app)

app.listen(port, () => {
    console.log('Example app listening on port ' + port)
})
