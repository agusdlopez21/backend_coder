const express = require('express')
const handlebars = require('express-handlebars')

const app = express()

app.engine('handlebars', handlebars.engine({
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views"
}))

app.set('views', './views')
app.set('view engine', 'handlebars')
app.use(express.urlencoded({extended: true}))
app.use(express.json())

const productos = []

// get
app.get('/', (req, res) => {
    res.render('formulario')
})


app.get('/productos', (req, res) => {
    res.render('historial', { productos })
    console.log(productos)
})

// post

app.post('/productos', (req, res) => {
    productos.push(req.body)
    console.log(req.body)
    res.redirect('/')
})

app.listen(8080)