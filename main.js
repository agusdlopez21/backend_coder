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
            } 
            catch(err) {
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
            }
            catch(err) {
                console.log(`Lo sentimos, se ha producido el siguiente error: ${err.message}`);
            }
        }
        return null;
    }

    async getAll(){
        try{
            const fileDate = JSON.parse(await fs.promises.readFile(this.nombreArchivo , 'utf-8'));
            return fileDate;
        } 
        catch(err) {
            console.log(`Lo sentimos, se ha producido el siguiente error: ${err.message}`);
        }
    }

    async deleteById (id){
        if (id >= this.counter){
            console.log(`No existe un producto con el id ${id}.`);
        } else {
            try{
                const fileDate = JSON.parse(await fs.promises.readFile(this.nombreArchivo , 'utf-8'));
                const fileDateEdited = fileDate.splice(id,1);
                await fs.promises.writeFile(this.nombreArchivo , JSON.stringify(fileDateEdited));
                this.decreaseCounter();
                console.log(`El producto con el id ${id} ha sido eliminado correctamente.`);
            } 
            catch(err) {
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

//Importo el módulo fs:
const fs = require('fs');

//Creo el objeto Contenedor:
const contenedor = new Contenedor('./productos.txt');

//Defino varios productos:
const producto1 = {
    titulo: 'bananas',
    precio: 200.00,
    url: "https://m.media-amazon.com/images/I/61fZ+YAYGaL._SL1500_.jpg"
}
const producto2 = {
    titulo: 'manzanas',
    precio: 360.00,
    url: "https://tramosdelmercado.odoo.com/web/image/product.template/215/image_1024?unique=68c581a"
}
const producto3 = {
    titulo: 'paltas',
    precio: 160.00,
    url: "https://storage.googleapis.com/portalfruticola/2020/02/6c4efcae-palta-shutterstock_263066297.jpg"
}

//Pasamos a la prueba

const main = async () => {
    // Se guardan los productos
    console.log('')
    console.log(`Guardado de productos: \n`);
    console.log("Producto 1:");
    await contenedor.save(producto1)
    .then(id => {
        if (id !== -1) {console.log("El producto ha sido guardado correctamente con el siguiente id: ", id)}
    })
    .catch(error => {
        console.log(`error: ${error}`)
    });

    console.log("\n");
    console.log("Producto 2:");
    await contenedor.save(producto2)
    .then(id => {
        if (id !== -1) {console.log("El producto ha sido guardado correctamente con el siguiente id: ", id)}
    })
    .catch(error => {
        console.log(`error: ${error}`)
    });

    console.log("\n");
    console.log("Producto 3:");
    await contenedor.save(producto3)
    .then(id => {
        if (id !== -1) {console.log("El producto ha sido guardado correctamente con el siguiente id: ", id)}
    })
    .catch(error => {
        console.log(`error: ${error}`)
    });


    // Recibe el Id y devuelve el Objeto

    console.log("\n");
    console.log(`Obtener productos según id:`);
    await contenedor.getById(0)
    .then(prodObtenido => {
        if (prodObtenido === null) {
            console.log("No se encontró el producto en el array.")
        } else {
            console.log(`El producto encontrado es el siguiente: \n- id: ${prodObtenido.id}\n- titulo: ${prodObtenido.titulo}\n- precio: ${prodObtenido.precio}\n- url: ${prodObtenido.url}`);
        }
    })
    .catch(error => {
        console.log(`error: ${error}`)
    });

    console.log("\n");
    await contenedor.getById(2)
    .then(prodObtenido => {
        if (prodObtenido === null) {
            console.log("No se encontró el producto en el array.")
        } else {
            console.log(`El producto encontrado es el siguiente: \n- id: ${prodObtenido.id}\n- titulo: ${prodObtenido.titulo}\n- precio: ${prodObtenido.precio}\n- url: ${prodObtenido.url}`);
        }
    })
    .catch(error => {
        console.log(`error: ${error}`)
    });

    console.log("\n");
    await contenedor.getById(4)
    .then(prodObtenido => {
        if (prodObtenido === null) {
            console.log("No se encontró el producto indicado en el listado.")
        } else {
            console.log(`El producto encontrado es el siguiente: \n- id: ${prodObtenido.id}\n- titulo: ${prodObtenido.titulo}\n- precio: ${prodObtenido.precio}\n- url: ${prodObtenido.url}`);
        }
    })
    .catch(error => {
        console.log(`error: ${error}`)
    });



        //Devuelve el array con los objeto con el id buscado
    console.log("\n");
    console.log("El listado de productos es el siguiente:");
    await contenedor.getAll()
    .then(productos => {
        productos.forEach(producto => {
            console.log(`El producto nro. ${producto.id}: \n- id: ${producto.id}\n- titulo: ${producto.titulo}\n- precio: ${producto.precio}\n- url: ${producto.url} \n`);
        });
    })
    .catch(error => {
        console.log(`error: ${error}`)
    });
    
    
    
    //Elimino todos los productos
    console.log(`Eliminar productos según id`);
    await contenedor.deleteById(1);
    console.log("\n");
    await contenedor.deleteById(5);

    console.log(`Eliminar productos`);
    await contenedor.deleteAll();
    console.log("\n");
    await contenedor.deleteAll();
}

main();