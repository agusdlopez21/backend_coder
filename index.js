const express = require('express');
const {promises : fs} = require ("fs");
const { Server: SocketServer } = require('socket.io')
const { Server: HttpServer } = require('http');
const app = express();
const PORT = process.env.PORT || 8080;

const httpServer = new HttpServer(app)
const io = new SocketServer(httpServer)

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static('public'));

io.on('connection', async socket => {
  console.log('socket id', socket.id);
  socket.emit('products', await getAll())
  socket.emit('conversation', await chatting())
})

let getAll = async () => {
  try {
      const products = await fs.readFile("./data/data.txt", "utf-8");
      let result = JSON.parse(products)
      return result
  }catch (err) {
    console.log(err);
  }
}

let chatting = async () => {
  try {
    const chat = await fs.readFile("./data/chat.txt", "utf-8")
    let result = JSON.parse(chat)
    return result
  }catch (err) {
    console.log(err);
  }
}

//Guardar Productos
app.post('/', async (req, res) => {
  let productos = await getAll()
  const { name, price, image } = req.body;

  const newProduct = {
    id: productos.length + 1,
    name,
    price,
    image
  };
  productos.push(newProduct);
  await fs.writeFile( "./data/data.txt", JSON.stringify(productos, null, 2), () => {
    return true
  })
  io.sockets.emit('products', await getAll())
  console.log("get", await getAll());
  res.redirect('/')
});


app.post('/chat', async (req, res) =>{
  let chatter = await chatting()
  let time = new Date()
  let mes = time.getMonth() +1 
  let dia = time.getDate().toString()
  if (dia.length == 1) dia = "0" + dia
  let temp = dia + "/"+ mes.toString() + "/" + time.getFullYear().toString() + " " +  time.getHours().toString() + ":" + time.getMinutes().toString() + ":" + time.getSeconds().toString()
  console.log(temp);
  const { author, message } = req.body;
  const newChat = {
    time: temp,
    author,
    message
  };
  chatter.push(newChat);
  await fs.writeFile("./data/chat.txt", JSON.stringify(chatter, null, 2), () =>{
    return true
  })
  io.sockets.emit('conversation', await chatting());
  res.redirect('/')
})

const connectedServer = httpServer.listen(PORT, () => console.log(`Servidor activo y escuchando en el puerto ${PORT}`));
connectedServer.on('error', (error) => console.log(error.message));