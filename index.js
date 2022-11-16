const express = require('express');
const Contenedor = require ('./Contenedor.js');
const clase = require ('./class.js');
const { Router } = express;
const app = express();
const content = new Contenedor('./productos.txt')


const PORT = 8080;

app.use(express.static(__dirname +'/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routerProductos = new Router();
const routerPro = new Router();



const produc = [];

//-----DEVUELVE TODOS LOS PRODUCTOS----- 

routerProductos.get('/', async (req, res) => {
    try
    {const prod = await content.getAll()
     res.send(prod)
    }
    catch (err){
     console.log(err)
    }
});


//-----DEVUELVE UN PRODCUTOS SEGUN SU ID-----

routerProductos.get('/:id', async (req, res) => {
    try
    { const {id} = req.params;
    console.log(id)
    const productoId = await content.getById(parseInt(id))
    res.send(productoId)
    }
    catch (err){
     console.log(err)
    }
});


//-----AGREGA UN NUEVO PRODCUTO----



routerPro.post('/',  (req, res) =>{
    const { body } =req
    produc.push(body);
    res.send(body);

});




//-----ELIMINA UN PRODUCTO SEGUN SU ID-----

routerProductos.delete('/:id', async (req, res) => {
    try
    {const {id} = req.params;
    const productoDel =await content.deleteById(parseInt(id))    
    res.send(productoDel)
}
catch (err){
    console.log(err)
}
} )


app.use('/api/productos', routerProductos);
app.use('/producto', routerPro);








const server = app.listen (PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
});

server.on("error", error => console.log ("error en el servidor", error))