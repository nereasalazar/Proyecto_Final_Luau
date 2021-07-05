const { Schema, model, Decimal128 }= require('mongoose');

const Ubicacion = new Schema(
    {
      nombre: {
        type: String,
        required: true,
      },
      provincia: {
        type: String,
        required: true,
      },
      localidad: {
        type: String,
        required: true,
      },
      direccion: {
        type: String,
        required: true,
      },
      codigoPostal:{
        type: Number,
        required: true,
      },
      latitud: {
        type: Decimal128,
        required: true,
      },
      longitud: {
        type: Decimal128,
        required: true,
      },
    }
  );

const nuevoEvento = new Schema({
    nombreAgasajado: {
        type: String, 
        required: true,
    },
    imagenAgasajado:{
        type: String,
        required: false,
    },
    diaEvento:{
        type: Date,
        required:true,
    },
    horaEvento:{
        type: String,
        required: false,
    },
    lugarEvento:{
        type: Ubicacion,
        required: true,
    },
    numInvitados:{
        type: Number,
        required:true,
    },
    conMisa:{
        type: Boolean,
        required: false,
    },
    lugarMisa:{
        type: String,
        required: false,
    },
    horaMisa:{
        type: String,
        required: false,
    },
    cuentaRegresiva:{
        type: Boolean,
        required: false,
    },
    cbu:{
        type: Number,
        required: false,
    },
},{
    timestamps: true //agrega collecciones y fechas de update
});

module.exports = model('eventos', nuevoEvento);



