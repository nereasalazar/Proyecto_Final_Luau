const { Router } = require("express");
const fetch = require("node-fetch");
const Usuario = require("../models/Usuario");
const Evento = require("../models/Evento");
const dateHelper = require("../helpers/dateHelper");

const router = Router();

router.get("/", (req, response) => {
  response.render("partials/login", { layout: "estructura" });
});

router.get("/login", (req, response) => {
  response.render("partials/login", { layout: "estructura" });
});

router.post("/login", async (req, response) => {
  const listaUsuarios = await Usuario.find(); // usamos esquema usuario y el metodo find para traer los usuarios de la BD

  for (let i = 0; i < listaUsuarios.length; i++) {
    if (
      listaUsuarios[i].email === req.body.email &&
      listaUsuarios[i].password === req.body.password
    ) {
      response.redirect(303, "/panel");
    }
  }
  response.redirect(303, "/login");
});

router.get("/registro", (req, response) => {
  response.render("partials/registro_usuarios", { layout: "estructura" });
});

router.post("/altausuario", async (req, response) => {
  const { email, password, repetirpassword } = req.body;
  if (password !== repetirpassword) {
    response.redirect(303, "/registro");
  }

  const newUsuario = new Usuario({
    email: email,
    password: password,
  });

  await newUsuario.save();
  response.redirect(303, "/login");
});

router.get("/panel", (req, response) => {
  response.render("partials/panel_usuario", { layout: "estructura" });
});

router.get("/formulariofiesta", (req, response) => {
  response.render("partials/formulario_fiesta", { layout: "formulario" });
});

router.post("/crearevento", async (req, res) => {
  try {
    const {
      nombreAgasajado,
      numInvitados,
      diaEvento,
      horaEvento,
      lugarEvento,
      direccion,
      localidad,
      provincia,
      codigoPostal,
      iglesia,
      horaMisa,
      cuentaRegresiva,
      cbu,
    } = req.body;
    console.log(req.body);
    const token =
      "pk.eyJ1IjoibmVyZWFzYWxhemFyIiwiYSI6ImNrcTV5YnhsdDB2ajYybnBmM3VjbXZqM2IifQ.uV3-VOvGmXP1NmB5iAgpRQ";
    const direccionCompleta = `${lugarEvento} ${direccion} ${localidad} ${provincia}`;
    const direccionFinal = direccionCompleta.replace(" ", "%20");

    const reqDireccion = `https://api.mapbox.com/geocoding/v5/mapbox.places/${direccionFinal}.json?country=AR&postcode=${codigoPostal}&limit=5&access_token=${token}`;

    const response = await fetch(reqDireccion);

    const jsonResponse = await response.json();
    const [latitud, longitud] = jsonResponse.features[0].center;

    const newEvento = new Evento({
        nombreAgasajado: nombreAgasajado,
        diaEvento: diaEvento,
        horaEvento: horaEvento,
        lugarEvento: {
        nombre: lugarEvento,
        direccion: direccion,
        provincia: provincia,
        localidad: localidad,
        codigoPostal: codigoPostal,
        latitud: latitud,
        longitud: longitud,
      },
        numInvitados: numInvitados,
        lugarMisa: iglesia,
        horaMisa: horaMisa,
        cuentaRegresiva: cuentaRegresiva,
        cbu: cbu,
    });

    await newEvento.save();
    res.redirect(303, "/evento/tarjeta/" + newEvento._id); // 303 get que redirige a la ruta evento/tarjeta y lo concatena con el id de mi nuevo evento
  } catch (error) {
    console.log(error);
  }
});

router.get("/evento/tarjeta/:id", async (req, response) => {
  try {
    const tarjeta = await Evento.findById(req.params.id).lean(); // convierto en objeto json

    tarjeta.diaEvento = dateHelper.formatDate(tarjeta.diaEvento);
    response.render("partials/tarjeta", {
      layout: "pantalla_tarjeta",
      tarjeta,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/listainvitados", (req, response) => {
  response.render("partials/lista_invitados", { layout: "estructura" });
});

router.get("/panelinvitados", (req, response) => {
  response.render("partials/panel_invitado", { layout: "estructura" });
});

router.get("/tablaeventos", (req, response) => {
  response.render("partials/tabla_eventos", {
    layout: "estructura",
    lista_eventos,
  });
});

router.get("/evento/mapaevento/:id", async (req, response) => {
  try {
    console.log(req.params.id);
    const evento = await Evento.findById(req.params.id).lean();

    const lat = evento.lugarEvento.latitud;
    const lon = evento.lugarEvento.longitud;

    response.render("layouts/mapa", {
      layout: "mapa",
      lat,
      lon,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
