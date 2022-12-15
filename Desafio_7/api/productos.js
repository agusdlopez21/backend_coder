const express = require("express");
const { Router } = express;
const Contenedor = require("./contenedor");
const multer = require("multer");
const knex = require("../src/db")
const app = express()
app.use(express.json())

let router = new Router();
let archivo = new Contenedor("productos");

router.get("/", async (req, res) => {
  //let data = await archivo.getAll();
  // console.log(data + " el get /")
  //  res.render("./partials/portada",{titulo:"QUE ME VAYA BIEN"})
  knex.from("productos").select("*")//esto devuelve promesa
  .then((json)=>{
    let archivoProducto = json
    res.render("index", { data: archivoProducto });
  })
  .catch(err=>{
      console.log(err)
    return err
  })
 
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

router.get("/form", (req,res)=>{
  knex.from("productos").select("*")//esto devuelve promesa
  .then((json)=>{
    let archivoProducto = json
    res.render("form", { data: archivoProducto });
  })
  .catch(err=>{
      console.log(err)
    return err
  })
  
})


router.post("/form", (req, res) => {
  let data = archivo.getAll();
  console.log(data)
  let newProduct = {
    name: req.body.name,
    price: req.body.price,
    urlFoto: req.body.urlFoto,
  };
  
  let idProductoAgregado = archivo.save(newProduct);
 // res.send(
 //   `El archivo se guardo correctamente y el id del nuevo productos es ${idProductoAgregado}`
 // );
  res.render("form",{data: data})
});

router.get("/:id", async (req, res) => {
  let data = await archivo.getById(req.params.id);
  res.json(data);
});

router.delete("/:id", async (req, res) => {
  let data = await archivo.deleteById(req.params.id);
  res.json(data);
  //res.send(productos);
});

router.put("/:id", async (req, res) => {
  let newProduct = {
    name: req.body.name,
    price: req.body.price,
    img: req.body.img,
  };

  let data = await archivo.putById(req.params.id, newProduct);
  res.json(data);
});

module.exports = router;
