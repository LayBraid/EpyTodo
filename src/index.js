const express = require('express')
const { format } = require('express/lib/response')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({'msg':'Hello World!'}))
})

app.get('/name/:name', (req, res) => {
    res.send('Hello ' + req.params.name + '!')
})

app.get('/date/', (req, res) => {
    var today = new Date()
    var dd = String(today.getDate())
    var mm = String(today.getMonth() + 1)
    var yyyy = today.getFullYear()
    res.send(yyyy+'-'+mm+'-'+dd)
})

app.listen(port, () => {
    console.log('Example app listening on port ${}')
})
