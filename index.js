const express = require('express')
// const { Router } = express

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api', express.static('public'))

const productos = []

// const routerProductos = new Router()
const routerProductos = express.Router()

routerProductos.post('/', (req, res) => {
    if (productos.length == 0){
    productos.push({...req.body, id: 1} )
    res.json('Se creo exitosamente el nuevo producto con el id: 1')
    } else {
        const ultimoId = productos.reverse()
    productos.push({...req.body, id: ultimoId[0].id + 1} )
    res.json('Se creo exitosamente el nuevo producto con el id: ' + (ultimoId[0].id + 1))
    }
})

routerProductos.get('/', (req, res) => {
    res.json(productos)
})



routerProductos.get('/:id', (req, res) => {
    let id = req.params.id
   let resultado = productos.filter( function (productos) {
                return productos.id == id
                
              })
              
            let resultado1 = (resultado.length > 0) ? resultado[0] : null

res.json(resultado1)
})

routerProductos.put('/:id', (req, res) => {
    const id = req.params.id
    const replaced = req.body

    if (isNaN(id)) {
        return res.json( {error: "el valor ingresado no es un numero"})
    }
    
    const find = productos.find(element => element.id === id)

    const index = productos.indexOf(find)

    productos.splice(index, 1, replaced)
    res.json({ok: refreshed})
})

routerProductos.delete('/:id', (req, res) => {
    const id = req.params.id
    if (isNaN(id)) {
        return res.json( {error: "el valor ingresado no es un numero"})
    }

    const index = productos.indexOf(productos.find(element => element.id ===id))
    productos.splice(index,1)

    res.json({
        result: 'ok',
        id: req.params.id
    })

})


app.use('/api/productos', routerProductos)

  
const server = app.listen(8080, () => {
    console.log('escuchando en el 8080')
})