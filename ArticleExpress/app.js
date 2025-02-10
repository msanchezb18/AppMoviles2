const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const http = require("http");

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose.connect("mongodb://localhost:27017/dbArticles", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Rutas
const indexRouter = require("./routes/index");
const parqueRouter = require("./routes/parques");

app.use("/", indexRouter);
app.use("/parque", parqueRouter);

// Iniciar el servidor
const port = process.env.PORT || 5005;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
