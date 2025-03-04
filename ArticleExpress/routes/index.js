var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  res.status(200).json({
    status_code: 200,
    status_message: "Ok",
    data: {
      title: "API de Lugares Turísticos",
      description: "API para gestionar información sobre lugares turísticos de distintas ciudades.",
    },
  });
});

module.exports = router;
