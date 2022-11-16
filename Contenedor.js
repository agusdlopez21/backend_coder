const { promises: fs} = require('fs')

class Contenedor {
    constructor(productos) {
        this.productos = productos
    }
    async getAll (){
        try{
            const contenedor = JSON.parse(await fs.readFile(`${this.productos}`, 'utf-8'))
            return contenedor
        }catch(error) {
            console.log(error)
        }
    }

    async deleteById (id){
        try{
            const contenedor = JSON.parse(await fs.readFile(`${this.productos}`, 'utf-8'))
            const filtro = contenedor.filter(e => e.id !==id )
            const del = fs.writeFile(`${this.productos}`,JSON.stringify(filtro,null, 2))
            console.log('ID ELIMINADO')
            
        }catch(error) {
            console.log(error)
        }
        
    } 

    async deleteAll (id){
        try{
            const contenedor = JSON.parse(await fs.readFile(`${this.productos}`, 'utf-8'))
            const filtro = contenedor.filter(e => e.id ===id )
            const del = fs.writeFile(`${this.productos}`,JSON.stringify(filtro,null, 2))
            console.log('CONTENIDO ELIMINADO')
        
        }catch(error) {
            console.log(error)
        }
    } 

    async getById (id) {
        try{
            
            const contenedor = JSON.parse(await fs.readFile(`${this.productos}`, 'utf-8'))
            const fil = contenedor.filter(e => e.id === id )
            const fill = fs.readFile(`${this.productos}`,fil)
            return fil
         
        }catch(error) {
            console.log(error)
        }
    }
    
    
}

module.exports = Contenedor;