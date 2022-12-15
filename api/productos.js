const express = require("express");
const { Router } = express;
const Contenedor = require("./contenedor");
const multer = require("multer");


let router = new Router();
let archivo = new Contenedor("text.json");

const elapsed = Date.now();
const hoy = new Date(elapsed)
const diaHoy= hoy.toLocaleDateString()



/******************/
//a.get
router.get("/", async (req, res) => {
  let data = await archivo.getAll();

  res.render("index", { data: data });
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

router.get("/form", (req, res) => {
  res.render("form");
});

/******************/
//b.post
router.post("/form", upload.single("myfile"), (req, res) => {
  req.query.admin = true
  if (req.query.admin) {
    let newProduct = {
      timestamp : diaHoy,
      name: req.body.name,
      description : req.body.description,
      codigo :req.body.codigo,
      urlFoto: req.body.urlFoto,
      price: req.body.price,
      stock: req.body.stock,
    };
    let idProductoAgregado = archivo.save(newProduct);
 
    console.log(`se guardo el producto ${idProductoAgregado}`)
    res.render("form");
  } else {
    res.send("error no esta autorizado apra acceder");
  }
});
/******************/
//get:/':id?

router.get("/productos/:id", async (req, res) => {
  let data = await archivo.getById(req.params.id);
  res.json(data);
});

/******************/
//c.put

router.put("productos/:id", async (req, res) => {
  if (req.query.admin) {
    let newProduct = {
      name: req.body.name,
      price: req.body.price,
      img: req.body.img,
    };

    let data = await archivo.putById(req.params.id, newProduct);
    res.json(data);
  } else {
    res.send("error no esta autorizado apra acceder");
  }
});

/******************/
//c.delete
router.delete("/productos/:id", async (req, res) => {
  if (req.query.admin) {
    let data = await archivo.deleteById(req.params.id);
    res.json(data);
  } else {
    res.send("error no esta autorizado apra acceder");
  }
});

module.exports = router;
