// http://localhost:8080/datos?min=10&nivel=15&max=20&titulo=<i>Medidor</i>

const express = require('express')

const app = express()

app.set('views', './views')
app.set('view engine', 'pug')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

const productos = []

// get

app.get('/productos', (req, res) => {
    res.render('layout', {productos})
})

// post

app.post('/productos', (req, res) => {
    productos.push(req.body)
    res.redirect('/')
})

app.get('/', (req, res) => {
    res.render('formulario', {productos})
})


app.listen(8080)