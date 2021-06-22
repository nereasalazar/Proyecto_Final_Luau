const express = require("express");
// const { prependListener } = require("node:process");
const path = require("path");
const app = express();

const handlebars = require("express-handlebars");

const PUERTO = 3000;
let usuarios = [
  {
    email: "nerea@luau.com",
    pass: "123456",
  },
  {
    email: "pablo@luau.com",
    pass: "123",
  },
  {
    email: "pepe",
    pass: "123123",
  },
];

const lista_eventos = [
  {
    nombreagasajado: "Pepe y Franca",
    diaevento: "27 julio 2021",
    horaevento: "19hs",
    lugarevento: "Espacio Tafi",
    lugarmisa: "Virgen de la Merced",
  },
];

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

app.get("/tarjeta", (request, response) => {
  response.render("partials/tarjeta", {
    layout: "pantalla_tarjeta",
    tarjeta: lista_eventos,
  });
});

app.get("/", (request, response) => {
  response.render("partials/login", { layout: "estructura" });
});

app.get("/login", (request, response) => {
  response.render("partials/login", { layout: "estructura" });
});

app.post("/login", function (request, response) {
  for (let i = 0; i < usuarios.length; i++) {
    if (
      usuarios[i].email === request.body.email &&
      usuarios[i].pass === request.body.password
    ) {
      response.redirect(303, "/panel");
    }
  }
  response.redirect(303, "/login");
});

app.get("/panel", (request, response) => {
  response.render("partials/panel_usuario", { layout: "estructura" });
});

app.get("/formulariofiesta", (request, response) => {
  response.render("partials/formulario_fiesta", { layout: "formulario" });
});

app.post("/crearevento", (request, response) => {
  const evento = {
    nombreagasajado: request.body.nombreAgasajado,
    numinvitados: request.body.numInvitados,
    diaevento: request.body.diaEvento,
    horaevento: request.body.horaEvento,
    lugarevento: request.body.lugarEvento,
    lugarmisa: request.body.iglesia,
    cbu: request.body.cbu,
  };

  lista_eventos.push(evento);

  response.render("partials/tarjeta", { layout: "pantalla_tarjeta", evento });
});

app.get("/listainvitados", (request, response) => {
  response.render("partials/lista_invitados", { layout: "estructura" });
});

app.get("/panelinvitados", (request, response) => {
  response.render("partials/panel_invitado", { layout: "estructura" });
});

app.get("/tablaeventos", (request, response) => {
  response.render("partials/tabla_eventos", { layout: "estructura" , lista_eventos });
});

app.get("/mapa", (request, response) => {
  response.render("layouts/mapa", {
    layout: "mapa",
    encodedJson: encodeURIComponent(
      JSON.stringify({
        lat: -26.8309886453465,
        lon: -65.20181033274156,
      })
    ),
  });
});
// Inicio server
app.listen(PUERTO, function () {
  console.log(`Servidor iniciado en puerto ${PUERTO}...`);
});
