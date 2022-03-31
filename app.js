const express = require('express')
const app = express()
const port = 3000;

const UserService = require('./services/UserService');
const ProductService = require('./services/ProductService');


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/users', (req, res) => {
    res.send(
        UserService.getAll()
    )
})

app.get('/products', (req, res) => {
    res.send(
        ProductService.getAll()
    )
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})