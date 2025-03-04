var express = require("express");
var router = express.Router();
var LugarTuristico = require("../models/lugares");

// Obtener todos los lugares turísticos
router.get("/", async (req, res) => {
  try {
    const { ciudad, categoria, keyword, fuente } = req.query;
    let query = {};

    if (ciudad) query.ciudad = new RegExp(ciudad, "i");
    if (categoria) query.categoria = new RegExp(categoria, "i");
    if (keyword) query.descripcion = new RegExp(keyword, "i");
    if (fuente) query.fuente = new RegExp(fuente, "i");

    const lugares = await LugarTuristico.find(query);
    res.status(200).json({ status_code: 200, status_message: "OK", data: lugares });
  } catch (err) {
    res.status(500).json({ status_code: 500, status_message: "Error en el servidor" });
  }
});

// Obtener un lugar por ID
router.get("/:id", async (req, res) => {
  try {
    const lugar = await LugarTuristico.findById(req.params.id);
    if (!lugar) {
      return res.status(404).json({ status_code: 404, status_message: "Lugar no encontrado" });
    }
    res.status(200).json({ status_code: 200, status_message: "OK", data: lugar });
  } catch (err) {
    res.status(500).json({ status_code: 500, status_message: "Error en el servidor" });
  }
});

// Agregar un nuevo lugar turístico
router.post("/", async (req, res) => {
  try {
    const nuevoLugar = new LugarTuristico(req.body);
    await nuevoLugar.save();
    res.status(201).json({ status_code: 201, status_message: "Lugar agregado", data: nuevoLugar });
  } catch (err) {
    res.status(500).json({ status_code: 500, status_message: "Error al agregar lugar" });
  }
});

// Eliminar un lugar turístico
router.delete("/:id", async (req, res) => {
  try {
    const lugar = await LugarTuristico.findByIdAndDelete(req.params.id);
    if (!lugar) {
      return res.status(404).json({ status_code: 404, status_message: "Lugar no encontrado" });
    }
    res.status(200).json({ status_code: 200, status_message: "Lugar eliminado" });
  } catch (err) {
    res.status(500).json({ status_code: 500, status_message: "Error en el servidor" });
  }
});

module.exports = router;
