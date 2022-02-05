const express = require("express");
const Productos = require("./contenedor.js");
const app = express();
const PORT = 8080;

let productos = new Productos();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/productos", async (req, res) => {
  let products = productos.getAll();
  res.render("products", { products });
});

app.post("/productos", (req, res) => {
  productos.save(req.body);
  res.redirect("/");
});

const server = app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});
server.on("error", (error) => console.log(`Error en servidor${error}`));
