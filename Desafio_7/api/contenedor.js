const express = require("express");
const fs = require("fs");
const nombreArchivo = "productos.json";
const encodingFile= "utf-8"
const knex = require("../src/db")
const app = express()
app.use(express.json())

class Contenedor {
  constructor(nombre) {
    this.nombre = nombre;
  }
    save(obj) {
        knex(this.nombre).insert(obj).then(()=>{
          console.log("register ok!!")
        }).catch (err=> {
        console.log(err)
      })
    }

    getById(id){

      try{
  
          const productos = this.getAll()
  
              if(typeof productos == "object"){
                const idNumero= Number(id);
                  if(typeof idNumero === "number" && idNumero <= productos.length && idNumero > 0 ) return productos.filter(el=> el.id === idNumero)
                  
              return `El id: ${id} es inválido.`
                  
              }else{
  
                  return `No existe el archivo ${this.nombre}.`
              }
  
          }
  
      catch(e){
  
      return e
      }
  } 
    
  
  
  getAll() {
    // devuelve un array con los obj presentes en el archivo
        knex.from(this.nombre).select("*")//esto devuelve promesa
        .then((json)=>{
        
          let archivoProducto = json
           
          return archivoProducto;
        })
        .catch(err=>{
            console.log(err)
          return err
        })
      
  }
  
      //Elimina del archivo el objeto con el id buscado
  
  deleteById(idString){


    
        const productos = this.getAll()
    
            if(typeof productos == "object"){
             let id = Number(idString); 
            if(typeof id === "number" && id <= productos.length && id > 0 ) {
    
                const newInfo= productos.filter(el=> el.id !==id)
    
                if(newInfo.length < productos.length){
    
            fs.writeFileSync( `./${this.nombre}`, JSON.stringify(newInfo))
    
            return `El Id ${id} fue eliminado`
    
            }
    
            return `El Id ${id} ya fue eliminado`
    
            }else{
    
                return `El Id ${id} es inválido`
            }
        }else return productos
    
    }

    deleteAll(){

      // Elimina todos los objetos presentes en el archivo.
      
      fs.writeFileSync( `./${this.nombre}`, JSON.stringify([]))
      
      return `Todos los objetos del archivo ‘${this.nombre}’ fueron eliminados`
      
    }
    
    putById(idString,obj){
      try{
  
        const productos = this.getAll()
            
            if(typeof productos == "object"){
              const id= Number(idString);
              
                if(typeof id === "number" && id <= productos.length && id> 0 ) {
                let posicion =  productos.findIndex(el=> el.id === id)
                  productos[posicion].name=obj.name;
                  productos[posicion].price=obj.price;
                  productos[posicion].name=obj.img;
                  fs.writeFileSync( `./${this.nombre}`, JSON.stringify(productos))
                  return `el producto ${id} fue actualizado con exito`
                }else
            return `El id: ${id} es inválido.`
                
            }else{

                return `No existe el archivo ${this.nombre}.`
            }

        }

    catch(e){

    return e
    }
    }


}



/* let archivos = new Contenedor(nombreArchivo);

archivos.save({
 
  title: "asdasdasd",
  price: 1200,
  thumbnail: "sgsdfsdg",
});
//archivos.getAll(); */
module.exports= Contenedor
