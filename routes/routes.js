
app.get("/", function (req, res) {
    res.render("pantalla_tarjeta");
});

app.post("/login", function (req, res) {
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].user === req.body.email && usuarios[i].pass === req.body.password) {
            res.sendFile(path.join(__dirname, "html/panel_usuario.html"));
        }
    }
    res.sendFile(path.join(__dirname, "html/index.html"));

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

    response.sendFile(path.join(__dirname,"html/formulario_fiesta.html"));

})

app.get("/miseventos", function(request,response){

    response.sendFile(path.join(__dirname,"html/tabla_eventos.html"));

})

app.post("/pantallatarjeta",function(request,response){

    response.sendFile(path.join(__dirname,"html/pantalla_tarjeta.html"))
})