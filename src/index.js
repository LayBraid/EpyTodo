const express = require('express')
const app = express()
const port = 8080
const db = require('./config/db')

app.get('/', (req, res) => {
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
    db.query("INSERT INTO user (id, email, password, name, firstname) values (1, 'agherasie@epitech.eu', 'pass', 'gherasie', 'alex');", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    })
})

app.listen(port, () => {
    console.log('Example app listening on port ' + port)
})
