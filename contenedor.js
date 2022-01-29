const fs = require("fs");

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
    try {
      this.productos = fs.readFileSync(this.archivo, "utf-8");
      this.productos = JSON.parse(this.productos);
    } catch (error) {
      this.productos = [];
    }
  }

  async save(title, price, url) {
    try {
      let newProduct = {title, price, url};
      newProduct.id = this.productos.length + 1;
      this.productos.push(newProduct);
      await fs.promises.writeFile(
        this.archivo, JSON.stringify(this.productos, null, "\t"));
        console.log({ done: 'ok', producto: newProduct })
        let resultado = { done: "Ok", producto: newProduct }
        return resultado
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      let archivo = await fs.promises.readFile(this.archivo, "utf-8");
      console.log(JSON.parse(archivo))
      return JSON.parse(archivo);
    } catch (error) {
      return console.log(this.productos);
    }
  }

  getById(id) {
    try {
      let producto = { id };
      for (let i = 0; i < this.productos.length; i++) {
        if (producto.id == this.productos[i].id) {
          producto = this.productos[i];
        }
      }
      return producto;
    } catch (error) {
      return error;
    }
  }

  getRandom() {
    return this.getById(Math.floor(Math.random() * this.productos.length) + 1);
  }

  deleteAll() {
    fs.truncateSync(this.archivo, 0, () =>
      console.log("Contenido Borrado de productos")
    );
  }

  async deleteById(id) {
    try {
      for (let i = 0; i < this.productos.length; i++) {
        if (id == this.productos[i].id) {
          this.productos.splice(id - 1, 1);
        }
      }
      await fs.promises.writeFile(
        this.archivo,
        JSON.stringify(this.productos, null)
      );
      return { delete: 'Ok' }
    } catch (error) {
      return "Error! ID no existe";
    }
  }
}

module.exports = Contenedor;

