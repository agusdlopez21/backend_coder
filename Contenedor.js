const fs = require('fs');

class Contenedor {
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo;
        this.counter = 0;
    }

    increaseCounter = () => {
        this.counter += 1;
    }

    decreaseCounter = () => {
        this.counter -= 1;
    }

    setCounter = (number) => {
        this.counter = number;
    }

    async save (objeto) {
       if (this.counter === 0) {
            try{
                this.increaseCounter();
                objeto = {id: this.counter, ...objeto};
                await fs.promises.writeFile(this.nombreArchivo , JSON.stringify([objeto])); 
                return this.counter;
            } catch(err) {
                console.log(`Lo sentimos, se ha producido el siguiente error: ${err.message}`);
            }
       } else {
            try{
                this.increaseCounter();
                objeto = {id: this.counter, ...objeto};
                const fileDate = JSON.parse(await fs.promises.readFile(this.nombreArchivo , 'utf-8'));
                fileDate.push(objeto);
                await fs.promises.writeFile(this.nombreArchivo , JSON.stringify(fileDate));
                return this.counter;
            } catch(err) {
                console.log(`Lo sentimos, se ha producido el siguiente error: ${err.message}`);
            }
       }
       return -1;
    }

    async getById(id){
        if (id >= this.counter){
            return null;
        } else {
            try{
                const fileDate = JSON.parse(await fs.promises.readFile(this.nombreArchivo , 'utf-8'));
                return fileDate[id];
            } catch(err) {
                console.log(`Lo sentimos, se ha producido el siguiente error: ${err.message}`);
            }
        }
        return null;
    }

    async getAll(){
        try{
            const fileDate = JSON.parse(await fs.promises.readFile(this.nombreArchivo , 'utf-8'));
            return fileDate;
        } catch(err) {
            console.log(`Lo sentimos, se ha producido el siguiente error: ${err.message}`);
        }
    }

    async deleteById (id){
        if (id >= this.counter){
            console.log(`No existe un producto con el id ${id}.`);
        } else {
            try{
                const fileDate = JSON.parse(await fs.promises.readFile(this.nombreArchivo , 'utf-8'));
                let fileDateEdited = fileDate.splice(id-1,1);
                await fs.promises.writeFile(this.nombreArchivo , JSON.stringify(fileDateEdited));
                console.log(`El producto con el id ${id} ha sido eliminado correctamente.`);
            } catch(err) {
                console.log(`Lo sentimos, se ha producido el siguiente error: ${err.message}`);
            }
        }
    }

    async deleteAll(){
        try{
            if(this.counter !== 0){
                await fs.promises.writeFile(this.nombreArchivo , JSON.stringify([]));
                this.setCounter(0);
                console.log("Todos los productos han sido eliminados correctamente.");
            } else {
                console.log("El listado de productos se encuentra vacío.");
            }
            
        } catch(err) {
            console.log(`Lo sentimos, se ha producido el siguiente error: ${err.message}`);
        }   
    }

}

module.exports = Contenedor;