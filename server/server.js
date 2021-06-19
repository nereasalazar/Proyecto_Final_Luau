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
            pass: "38088"
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

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../html/index.html"));
});

app.post("/login", function (req, res) {
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].user === req.body.email && usuarios[i].pass === req.body.password) {
            res.sendFile(path.join(__dirname, "../html/panel_usuario.html"));
        }
    }
    res.sendFile(path.join(__dirname, "../html/index.html"));

});

app.post("/registro",function(request,response){
    for(let i = 0; i < usuarios.lenght; i++){
        if(usuarios[i].user === request.body.user){
            response.sendFile(path.join(__dirname,"registro.html"));
        }
    }

    if(request.body.password === request.body.password2){
        usuarios.push(
            {
                user: request.body.user,
                pass: request.body.password
            }
        );

        response.sendFile(path.join(__dirname,"login.html"));
    }else{
        response.sendFile(path.join(__dirname,"registro.html"));
        
    }
})

app.get("/nuevoevento", function(request,response){

    response.sendFile(path.join(__dirname,"../html/formulario_fiesta.html"));

})

app.get("/miseventos", function(request,response){

    response.sendFile(path.join(__dirname,"../html/tabla_eventos.html"));

})

// Inicio server
app.listen(PUERTO, function () {
    console.log(`Servidor iniciado en puerto ${PUERTO}...`);
});
