const express = require("express");
const Productos = require("./contenedor.js");
const hbs = require("express-handlebars");
const app = express();
const PORT = 8080;

let productos = new Productos();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", hbs.engine());
app.set("views", "./views");
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("form");
});

app.get("/productos", async (req, res) => {
  let products = productos.getAll();
  res.render("table", { products });
});

app.post("/productos", (req, res) => {
  productos.save(req.body);
  res.redirect("/");
});

const server = app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});
server.on("error", (error) => console.log(`Error en servidor${error}`));
