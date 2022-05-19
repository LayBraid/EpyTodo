const express = require('express')
const app = express()
const port = 3000

const register = require('./routes/user/user.js')

app.post('/register', register.register)

/*app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({'msg':'Hello World!'}))
})

app.get('/user', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    db.query("SELECT * FROM user", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result)
    });
})

app.post('/user', (req, res) => {
    db.query("INSERT INTO user (email, password, name, firstname) values ('agherasie@epitech.eu', 'pass', 'gherasie', 'alex');", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    })
})*/

app.listen(port, () => {
    console.log('Example app listening on port ' + port)
})
