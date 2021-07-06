const { Schema, model, Decimal128 }= require('mongoose');

const Ubicacion = new Schema(
    {
      nombre: {
        type: String,
        required: false,
      },
      provincia: {
        type: String,
        required: false,
      },
      localidad: {
        type: String,
        required: false,
      },
      direccion: {
        type: String,
        required: false,
      },
      codigoPostal:{
        type: Number,
        required: false,
      },
      latitud: {
        type: Decimal128,
        required: false,
      },
      longitud: {
        type: Decimal128,
        required: false,
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
    tieneMisa:{
        type: Boolean,
        required: true,
    },
    lugarMisa:{
        type: Ubicacion,
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



