const SchemeUser = require('./scheme_db');
const express = require('express');
const app = express();

// Guardar usuario
app.post('/usuario', (req, res) => {
    let body = req.body;
    let usuarios = new SchemeUser({
        usuario: body.usuario,
        contraseña: body.contraseña
    });
    usuarios.save((err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: userDB
        });
    });
});
module.exports = app;