//Importo el módulo fs
const fs = require('fs');
//Importo el Contenedor
const Contenedor = require('./Contenedor.js');
//Importo Express
const express = require("express");

function armarTablaProductos(productos){
    let tablaProd = 
    `<table border="1" align="center" bordercolor="black" cellspacing="2">
        <caption style="padding: 20px; font-size:20px;"><B>Listado de Productos</B></caption>
        <tr bgcolor="grey" align="center">
            <th width=200>Titulo</th>
            <th width=200>Precio</th>
            <th width=200>Img</th>
        </tr>`

    productos.forEach(prod => {
        tablaProd = tablaProd +
        `<tr align="center">
            <th width=200>${prod.titulo}</td>
            <th width=200>${prod.precio}</td>
            <th width=200><img src="${prod.url}" alt="${prod.titulo}" width="200" height="200"/></td>
        </tr>`
    });

    tablaProd= tablaProd + `</table>`

    return tablaProd;
}

function armarTablaProducto(producto){
    const tablaProd = 
    `<table border="1" align="center" bordercolor="black" cellspacing="2">
        <caption style="padding: 20px; font-size:20px;"><B>Producto Random</B></caption>
        <tr bgcolor="grey" align="center">
            <th width=200>Titulo</th>
            <th width=200>Precio</th>
            <th width=200>Img</th>
        </tr>
        <tr align="center">
            <th width=200>${producto.titulo}</td>
            <th width=200>${producto.precio}</td>
            <th width=200><img src="${producto.url}" alt="${producto.titulo}" width="200" height="200"/></td>
        </tr>
    </table>`
    return tablaProd;
}



//Creo el objeto Contenedor
const contenedor = new Contenedor('./productos.txt');

const app = express();

app.get('/', (req,res) => {
    res.send('<h1 style="color:blue;">Bienvenido al Contenedor de Productos.</h1>');
});

app.get('/productos', async (req,res) => {
    const productos = await contenedor.getAll();
    let tablaProd = armarTablaProductos(productos);
    res.send(tablaProd);
});

app.get('/productoRandom', async (req,res) => {
    const productos = await contenedor.getAll();
    const numeroRand = Math.floor(Math.random() * productos.length);
    const tablaProd = armarTablaProducto(productos[numeroRand]);
    res.send(tablaProd);
});

const PORT = process.env.PORT || 8080; //si la var port no esta definida en el environment va por default 8080
const server = app.listen(PORT, () => {
    console.log(
        `Servidor express escuchando en el puerto ${PORT}`
    );
});
server.on('error', err => console.log(`error: ${err}`));