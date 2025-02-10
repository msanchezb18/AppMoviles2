// Parque.js
const mongoose = require("mongoose");

const ParqueSchema = new mongoose.Schema(
  {
    nombre: String,
    ubicacion: String,
    extension: Number, // Extensión en hectáreas
    descripcion: String,
    imagen: String, // URL de la imagen del parque
    comentarios: [
      {
        comentario: String,
        autor: String,
        fecha: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Parque", ParqueSchema);
