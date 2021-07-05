const mongoose = require('mongoose');

const uri = "mongodb+srv://usuario_luau:luau123@cluster0.duzoj.mongodb.net/luau";

mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then( result => {
    console.log("conectado correctamente");
})
.catch (err =>{
    console.log("error db:",err);
});