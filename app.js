const express = require('express')
const app = express()
const port = 3000;
const bodyParser = require('body-parser')

const UserService = require('./services/UserService');
const ProductService = require('./services/ProductService');

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/users', (req, res) => {
    res.send(
        UserService.getAll()
    )
})

app.post('/user/new', (req, res) => {
    res.send(
        UserService.addNew(req)
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