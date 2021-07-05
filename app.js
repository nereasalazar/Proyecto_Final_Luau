const express = require("express"); //declaramos express me da la estrucura para acceder más fácil al request
const path = require("path"); // path es para unir directorios
const app = express(); 
const db = require("./mongo"); //conexión a bd
const handlebars = require("express-handlebars");

const PUERTO = 3000;

app.set("view engine", "hbs");
app.engine(
  "hbs",
  handlebars({
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/partials"),
    extname: "hbs",
  })
);

// Middleware para poner el contenido de un form post en req.body
app.use(express.urlencoded({ extended: true }));

// Middleware para archivos de imagen, css, scripts, etc ("recursos estáticos")
app.use(express.static(path.join(__dirname, "public")));

//llamada a routes
app.use(require('./routes/routes')); 

// Inicio server
app.listen(PUERTO, function () {
  console.log(`Servidor iniciado en puerto ${PUERTO}...`);
});