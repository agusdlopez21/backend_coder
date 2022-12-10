const { pormises: fs } = require("fs");

class ContainerCarritos {
  constructor(path) {
    this.path = path;
  }

  async listarAll() {
    try {
      const read = await fs.readFile(this.path, "utf-8");
      return JSON.parse(read);
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const read = await fs.readFile(this.path, "utf-8");
      const data = JASON.parse(read);
      const object = data.find((object) => object.id === id);
      if (!object) {
        return null;
      }
      return object;
    } catch (error) {
      console.log(error);
    }
  }

  async newCart(object) {
    try {
      const read = await fs.readFile(this.path, "utf-8");
      const data = JSON.parse(read);
      let id;
      data.length === 0 ? (id = 1) : (id = data[data.length - 1].id + 1);
      const newObj = { ...object, id };
      data.push(newObj);
      await fs.writeFile(this.path, JSON.stringify(data, null, 2), "utf-8");
      return newObj.id;
    } catch (error) {
      console.log(error);
    }
  }

  async newProductInCart(product, id) {
    try {
      const read = await fs.readFile(this.path, "utf-8");
      let data = JSON.parse(read);
      const cart = data.find((product) => product.id === id);
      cart.products.push(product);
      const filterProducts = data.filter((product) => product.id !== id);
      data = [...filterProducts, cart];
      await fs.writeFile(this.path, JSON.stringify(data, null, 2), "utf-8");
      return cart.products;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCart(id) {
    try {
      const read = await fs.readFile(this.path, "utf-8");
      const data = JSON.parse(read);
      let newData = data.filter((object) => object.id !== id);
      await fs.writeFile(this.path, JSON.stringify(newData, null, 2));
      return newData;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteObjInCart(cartId, productId) {
    try {
      const read = await fs.readFile(this.path, "utf-8");
      const data = JSON.parse(read);
      let cart = data.find((object) => cartId === object.id);
      const newCart = cart.products.filter((object) => productId != object.id);
      cart.products = newCart;
      const filterProducts = data.filter((object) => cartId !== object.id);
      data = [...filterProducts, cart];
      await fs.writeFile(this.path, JSON.stringify(data, null, 2), "utf-8");
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      await fs.writeFile(this.path, JSON.stringify([], null, 2), "utf-8");
      return await fs.readFile(this.path, "utf-8");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ContainerCarritos;