const express = require("express");
// const { prependListener } = require("node:process");
const path = require("path");
const app = express();

const handlebars= require('express-handlebars');

const PUERTO = 3000;
let usuarios =
    [
        {
            user: "nerea@luau.com",
            pass: "123456"
        },
        {
            user: "pablo@luau.com",
            pass: "123"
        },
        {
            user: "pepe",
            pass: "123123"
        },
    ];

const tarjeta={
    nombreagasajado:"Pepe y Franca",
    diaevento:"27 julio 2021",
    horaevento:"19hs",
    lugarevento:"Espacio Tafi",
    lugarmisa:"Virgen de la Merced"
};


app.set('view engine','hbs')
app.engine('hbs',handlebars({
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    extname: 'hbs'
}));

// Middleware para poner el contenido de un form post en req.body
app.use(express.urlencoded({ extended: true }));

// Middleware para archivos de imagen, css, scripts, etc ("recursos estáticos")
app.use(express.static(path.join(__dirname, 'public')));

app.get('/tarjeta',(request,response)=>{
    response.render('partials/tarjeta',{layout:'pantalla_tarjeta', tarjeta: tarjeta});
});

app.get('/login',(request,response)=>{
    response.render('partials/login',{layout:'estructura'});
});

app.get('/panel',(request,response)=>{
    response.render('partials/panel_usuario',{layout:'estructura'});
});

app.get('/formulariofiesta',(request,response)=>{
    response.render('partials/formulario_fiesta',{layout:'formulario'});
});

app.get('/listainvitados',(request,response)=>{
    response.render('partials/lista_invitados',{layout:'estructura'});
});

app.get('/listainvitados',(request,response)=>{
    response.render('partials/lista_invitados',{layout:'estructura'});
});

app.get('/panelinvitados',(request,response)=>{
    response.render('partials/panel_invitado',{layout:'estructura'});
});

app.get('/tablaeventos',(request,response)=>{
    response.render('partials/tabla_eventos',{layout:'estructura'});
});
// Inicio server
app.listen(PUERTO, function () {
    console.log(`Servidor iniciado en puerto ${PUERTO}...`);
});
