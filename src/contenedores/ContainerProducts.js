const { promises: fs } = require("fs");

class ContainerProducts {
  constructor(path) {
    this.path = path;
  }

  async getAll() {
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
      const data = JSON.parse(read);
      const object = data.find((object) => object.id === id);
      if (!object) {
        return null;
      }
      return object;
    } catch (error) {
      console.log(error);
    }
  }

  async update(object, id) {
    try {
      const read = await fs.readFile(this.path, "utf-8");
      let data = JSON.parse(read);
      const filterObj = data.filter((object) => object.id !== id);
      const newObj = { ...id, ...object };
      data = [...filterObj, newObj];

      await fs.writeFile(this.path, JSON.stringify(data, null, 2), "utf-8");
      return newObj;
    } catch (error) {
      console.log(error);
    }
  }

  //Metodo POST
  async save(object) {
    try {
      const read = await fs.readFile(this.path, "utf-8");
      const data = JSON.parse(read);
      let id;
      data.length === 0 ? (id = 1) : (id = data[data.length - 1].id + 1);
      const newProduct = { ...object, id };
      data.push(newProduct);
      await fs.writeFile(this.path, JSON.stringify(data, null, 2), "utf-8");
      return newProduct;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      const read = await fs.readFile(this.path, "utf-8");
      const data = JSON.parse(data);
      const deletedObj = data.find((object) => object.id === id);
      const newData = data.filter((object) => object.id != id);
      await fs.writeFile(this.path, JSON.stringify(newData, null, 2), "utf-8");
      return deletedObj;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      await fs.writeFile(this.path, JSON.stringify([], null, 2), "utf-8");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ContainerProducts;
