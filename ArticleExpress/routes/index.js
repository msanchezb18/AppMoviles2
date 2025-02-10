// index.js
var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  salida = {
    status_code: 200,
    status_message: "Ok",
    data: {
      title: "API de Parques Nacionales de Costa Rica",
      description:
        "Una API para gestionar información sobre los parques nacionales de Costa Rica.",
    },
  };
  res.set("Content-Type", "application/json").status(200).send(salida);
});

module.exports = router;
