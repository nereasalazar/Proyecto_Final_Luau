const express = require("express");
// const { prependListener } = require("node:process");
const path = require("path");
const app = express();

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
// Middleware para poner el contenido de un form post en req.body
app.use(express.urlencoded({ extended: true }));

// Middleware para archivos de imagen, css, scripts, etc ("recursos estáticos")
app.use(express.static(__dirname));



// Inicio server
app.listen(PUERTO, function () {
    console.log(`Servidor iniciado en puerto ${PUERTO}...`);
});
