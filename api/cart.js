const express = require("express");
const { Router } = express;
const Contenedor = require("./contenedor");
const multer = require("multer");

let router = new Router();
let carrito = new Contenedor("cart.json");
let prod = new Contenedor("text.json");

const elapsed = Date.now();
const hoy = new Date(elapsed)
const diaHoy= hoy.toLocaleDateString()

router.post("/", (req, res) => {
  if (req.query.admin) {
    let newCarrito = {
      time: diaHoy,
      productos : [],
    };
    let idCarritoAgregado = carrito.save(newCarrito);
    alert(`se guardo el carrito con id numero ${idCarritoAgregado}`)
    res.render("cart");
  } else {
    res.send("error no esta autorizado apra acceder");
  }
});

router.delete("/:id", async (req, res) => {
  let data = await archivo.deleteById(req.params.id);
  res.json(data);
  //res.send(productos);
});

router.get("/", async (req, res) => {
  let data = await carrito.getAll();
  res.render("cart", { data: data });
});

router.get("/:id/productos", async (req, res) => {
  let data = await carrito.getAll();
  res.render("cart", { data: data });
});

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

let upload = multer({ storage });

router.get("/form",(req,res)=>{
  res.render("form")
})

//************/
/************/
/* SUMAR ARTICULOS AL CARRITO */

router.post("/:id/productos/:idCarrito", (req, res) => {
  let data = prod.getAll();
  res.render("index", { data: data });
  let objSelect= data.find(x=>{
    return x.id === req.params.id
  })

  let carro = carrito.getAll
  let carSelect= carro.find(x=>{
    return x.id === req.params.id
  })
  carSelect.productos.push(objSelect)
  
  carrito.save(carSelect)

});

//************/
/************/
/* ELIMINAR ARTICULOS DEL CARRITO */

router.delete("/:id/productos/:id_prod", async (req, res) => {
  let carro = carrito.getAll
  let carSelect= carro.find(x=>{
    return x.id === req.params.id
  })

  let newProductCarro = carSelect.productos.filter(el=> el.id !==id)
  carSelect.productos = newProductCarro
  carrito.save(carSelect);
  
});




module.exports = router;
