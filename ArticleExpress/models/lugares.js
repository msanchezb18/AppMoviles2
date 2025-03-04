const mongoose = require("mongoose");

const lugarTuristicoSchema = new mongoose.Schema(
  {
    nombre: String,
    descripcion: String,
    direccion: String,
    ciudad: String,
    categoria: String, // accommodation, attraction, poi, restaurant
    fuente: String, // Booking, Facebook, Foursquare, GooglePlaces
    telefono: String,
    email: String,
    imagen: String,
    sitioWeb: String,
    horario: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("LugarTuristico", lugarTuristicoSchema);
