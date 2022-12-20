//crear una base de datos llamada ecommerce que contenga dos colecciones: mensajes y productos

use ecommerce

db.createCollection('mensajes');

db.createCollection('productos');

//Agregar 10 documentos con valores distintos a las colecciones mensajes y productos. El formato de los documentos debe estar en correspondencia con el que venimos utilizando en el entregable con base de datos MariaDB. 

//Definir las claves de los documentos en relación a los campos de las tablas de esa base. En el caso de los productos, poner valores al campo precio entre los 100 y 5000 pesos(eligiendo valores intermedios, ej: 120, 580, 900, 1280, 1700, 2300, 2860, 3350, 4320, 4990). 

db.productos.insertMany([
    {title:"escuadra", price: 200, thumbnail: "https://cdn2.iconfinder.com/data/icons/draw-and-design/512/esquadra-2-512.png" },
    {title:"cuaderno", price: 250, thumbnail: "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678071-address-book-alt-512.png" },
    {title:"lapiz", price: 500, thumbnail: "https://cdn1.iconfinder.com/data/icons/drawing-tools-5/512/pencil-512.png" },
    {title:"borrador", price: 1500, thumbnail: "https://cdn2.iconfinder.com/data/icons/basic-flat-icon-set/128/eraser-512.png" },
    {title:"regla", price: 2000, thumbnail: "https://cdn0.iconfinder.com/data/icons/small-things/100/small-stuff-20151014-go-17-512.png" },
    {title:"lapicero", price: 3500, thumbnail: "https://cdn0.iconfinder.com/data/icons/digital-marketing-2-12/50/151-512.png" },
    {title:"cartuchera", price: 4000, thumbnail: "https://cdn4.iconfinder.com/data/icons/education-759/2050/Education_flat-40-512.png" },
    {title:"lonchera", price: 4900, thumbnail: "https://cdn4.iconfinder.com/data/icons/school-and-education-4-5/128/172-512.png" },
    {title:"mochila", price: 2500, thumbnail: "https://cdn3.iconfinder.com/data/icons/spring-2-1/30/Backpack-512.png" },
    {title:"pelota", price: 4650, thumbnail: "https://cdn1.iconfinder.com/data/icons/soccer-football-6/512/N_T_517Artboard_1_copy_2-512.png" }
])

db.mensajes.insertMany([
        {email:"alexander@hotmail.com",text:"Hola",date:"10/12/2022"},
        {email:"maria@hotmail.com",text:"Como estas?",date:"11/12/2022"},
        {email:"layla@hotmail.com",text:"Mucho gusto",date:"05/12/2022"},
        {email:"susana@hotmail.com",text:"Esty bien",date:"06/11/2022"},
        {email:"zhanna@hotmail.com",text:"Me alegro",date:"10/10/2022"},
        {email:"francisco@hotmail.com",text:"Bueno",date:"20/09/2022"},
        {email:"alba@hotmail.com",text:"Que mal",date:"25/11/2022"},
        {email:"juan@hotmail.com",text:"Esta bien",date:"10/12/2022"},
        {email:"diana@hotmail.com",text:"Entiendo",date:"12/02/2022"},
        {email:"elon@hotmail.com",text:"Increible",date:"12/03/2022"},
 
])

//Listar todos los documentos en cada colección.

db.productos.find();
db.mensajes.find();

//Mostrar la cantidad de documentos almacenados en cada una de ellas

db.productos.countDocuments();
db.mensajes.countDocuments()

//Realizar un CRUD sobre la colección de productos:
// a) Agregar un producto más en la colección de productos

db.productos.insertOne(
    {title:"lampara", price: 3000, thumbnail: "https://cdn0.iconfinder.com/data/icons/interior-and-decor-vol-1-1/512/19-512.png" }
    )

// b) Realizar una consulta por nombre de producto específico:
//i) Listar los productos con precio menor a 1000 pesos

db.productos.find({"price":{$lt:1000}})

//ii) Listar los productos con precio entre los 1000 a 3000 pesos.

db.productos.find({"price":{$gt:1000,$lt:3000}})

// iii) Listar los productos con precio mayor a 3000 pesos.

db.productos.find({"price":{$gt:3000}})

// v) Realizar una consulta que traiga sólo el nombre del tercer producto más barato.

db.productos.find({},{"title":1}).sort({price:1}).limit(1).skip(2)

// c) Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100.

 db.productos.updateMany({},{$set:{"stock":100}})

//d) Cambiar el stock a cero de los productos con precios mayores a 4000 pesos.

db.productos.updateMany({"price":{$gt:4000}},{$set:{"stock":0}})

// e) Borrar los productos con precio menor a 1000 pesos

db.productos.deleteMany({"price":{$lt:1000}})

// 6) Crear un usuario 'pepe' clave: 'asd456' que sólo pueda leer la base de datos ecommerce. Verificar que pepe no pueda cambiar la información

db.createUser({"user":"pepe","pwd":"asd456","roles":[{role:"read",db:"ecommerce"}]})