const express = require("express")
const productosRoutes = require("./api/productos");
const Contenedor = require("./api/contenedor");
const cartsRoutes = require("./api/cart");

const app = express()
const port = process.env.PORT || 8080

//midelwars de aplicacion
app.use(express.json())
app.use(express.urlencoded({extended:false}))//para decodificar la url .



app.set("view engine" ,"ejs")
app.set("views","./views")

app.use("/",productosRoutes);
app.use("/api/productos",productosRoutes);
app.use("/api/cart",cartsRoutes);


app.listen(port,()=>{
    console.log("server ok")
})