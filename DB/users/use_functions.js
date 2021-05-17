const SchemeUser = require('./scheme_db');
const express = require('express');
const bcrypt = require('bcrypt');
const app = express();

// Guardar usuario
app.post('/usuario', (req, res) => {
    let body = req.body;
    let usuarios = new SchemeUser({
        usuario: body.usuario,
        contraseña: bcrypt.hashSync(body.contraseña, 10)
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

// Listar usuarios
app.get('/usuario', function(req, res) {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    SchemeUser.find()
        .skip(desde)
        .limit(limite)
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            // Contar usuarios
            SchemeUser.count((err, conteo) => {
                res.json({
                    ok: true,
                    users,
                    cuantos: conteo
                });
            });
        })
});

module.exports = app;