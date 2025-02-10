// routes/parques.js
var express = require("express");
var router = express.Router();
var Parque = require("../models/parques");

// Obtener todos los parques
router.get("/", function (req, res) {
  Parque.find({}, function (err, parques) {
    if (err) {
      res
        .status(500)
        .send({
          status_code: 500,
          status_message: "Error al obtener los parques",
        });
    } else {
      res
        .status(200)
        .send({ status_code: 200, status_message: "Ok", data: parques });
    }
  });
});

// Obtener un parque por ID
router.get("/:id", function (req, res) {
  Parque.findById(req.params.id, function (err, parque) {
    if (err) {
      res
        .status(500)
        .send({
          status_code: 500,
          status_message: "Error al obtener el parque",
        });
    } else if (!parque) {
      res
        .status(404)
        .send({ status_code: 404, status_message: "Parque no encontrado" });
    } else {
      res
        .status(200)
        .send({ status_code: 200, status_message: "Ok", data: parque });
    }
  });
});

// Crear un nuevo parque
router.post("/", function (req, res) {
  var nuevoParque = new Parque(req.body);
  nuevoParque.save(function (err, parque) {
    if (err) {
      res
        .status(500)
        .send({ status_code: 500, status_message: "Error al crear el parque" });
    } else {
      res
        .status(201)
        .send({
          status_code: 201,
          status_message: "Parque creado",
          data: parque,
        });
    }
  });
});

// Actualizar un parque por ID
router.put("/:id", function (req, res) {
  Parque.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    function (err, parque) {
      if (err) {
        res
          .status(500)
          .send({
            status_code: 500,
            status_message: "Error al actualizar el parque",
          });
      } else if (!parque) {
        res
          .status(404)
          .send({ status_code: 404, status_message: "Parque no encontrado" });
      } else {
        res
          .status(200)
          .send({
            status_code: 200,
            status_message: "Parque actualizado",
            data: parque,
          });
      }
    }
  );
});

// Eliminar un parque por ID
router.delete("/:id", function (req, res) {
  Parque.findByIdAndDelete(req.params.id, function (err, parque) {
    if (err) {
      res
        .status(500)
        .send({
          status_code: 500,
          status_message: "Error al eliminar el parque",
        });
    } else if (!parque) {
      res
        .status(404)
        .send({ status_code: 404, status_message: "Parque no encontrado" });
    } else {
      res
        .status(200)
        .send({
          status_code: 200,
          status_message: "Parque eliminado",
          data: parque,
        });
    }
  });
});

module.exports = router;
