const knex = require("knex")({
    client:"mysql",
    connection:{
        host:"localhost",//o 127.0.0.1
        port:3306,
        user:"root",
        password:"",
        database:"entrega16"
    },
   pool:{min:2, max:8}//como organizo las consultas
})
knex.schema.createTableIfNotExists("productos",function(table){
    table.increments("id").primary()
    table.string("name")
    table.integer("price") 
    table.string("urlFoto")
})
.then(()=>{
    console.log("Conexion y Tabla creada")
})
.catch((err)=>{
    console.log(err)
})

 module.exports= knex