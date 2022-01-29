const express = require("express");
const app = express();
const Contenedor = require("./contenedor");
const PORT = 8080;
let productos = new Contenedor("./productos.txt");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/api/productos", async (req, res) => {
  res.json(await productos.getAll());
});

app.get("/api/productos/:id", (req, res) => {
  res.json(productos.getById(req.params.id));
});

app.post("/api/productos", async (req, res) => {
  let { title, price, thumbnail } = req.body;
  let producto = await productos.save(title, price, thumbnail);
  res.json(producto);
});

app.delete("/api/productos/:id", async (req, res) => {
  res.json(await productos.deleteById(req.params.id));
});

const server = app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});
server.on("error", (error) => console.log(`Error en servidor${error}`));
