const express = require('express')
const app = express()
const port = 3000

var bodyParser = require('body-parser')

app.use(express.raw());

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

require('./routes/user/user.js')(app)
require('./routes/todos/todos.js')(app)
require('./routes/auth/auth.js')(app)

app.listen(port, () => {
    console.log('Example app listening on port ' + port)
})
