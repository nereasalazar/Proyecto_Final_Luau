const {Schema,model} = require('mongoose');

const nuevoUsuario = new Schema ({
    email:{
        type: String,
        required: true,
    },
    password:{
        type:String,
        required: true,
    }
}, {timestamps: true});

module.exports= model('usuarios',nuevoUsuario)