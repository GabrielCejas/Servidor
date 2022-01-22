const express = require("express");
const app = express();
const Contenedor = require("./contenedor");
const PORT = 8080;
let productos = new Contenedor("./productos.txt");

app.get("/", (req, res, next) => {
  res.send(
    `<h2>Elija una opción</h2>
    <ul> <li> <a href="/productos"> Productos </a> </li> <li> <a href="productoRandom"> Producto Random </a> </li> </ul>`
  );
});

app.get("/productos", (req, res, next) => {
  productos.getAll().then((resultado) => {
    res.send(resultado);
  });
});

app.get("/productoRandom", (req, res, next) => {
  res.send(productos.getRandom());
});

const server = app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});
server.on("error", (error) => console.log(`Error en servidor${error}`));
