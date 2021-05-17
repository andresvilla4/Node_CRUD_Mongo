const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = 3000;
let urlDB = 'mongodb://127.0.0.1:27017/usuarios_registrados';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Configuración de rutas
app.use(require('../Routes/request_processor'));

// connect to DB
mongoose.connect(urlDB, { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
    if (err) throw err;
    console.log('Base de datos ONLINE');
});

app.listen(port);
console.log(`Listening on port: ${port}`);