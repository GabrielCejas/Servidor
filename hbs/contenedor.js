class Productos {
  constructor() {
    this.productos = [];
  }

  getAll() {
    return this.productos;
  }

  save(odjeto) {
    if (this.productos.length <= 0) odjeto.id = 1;
    else odjeto.id = this.productos[this.productos.length - 1].id + 1;
    this.productos.push(odjeto);
    return odjeto;
  }
}

module.exports = Productos;
