const userScheme = require('./scheme_db');
const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const _ = require('underscore');

// Guardar usuario
app.post('/usuario', (req, res) => {
    try {
        let body = req.body;
        let usuarios = new userScheme({
            usuario: body.usuario,
            contraseña: bcrypt.hashSync(body.contraseña, 10)
        });
        usuarios.save();
        res.json({
            ok: true,
            message: 'Usuario creado con éxito'
        });
    } catch (error) {
        res.json({
            ok: false,
            message: 'Error al crear usuario'
        })
    }
});

// Listar usuarios
app.get('/usuario', (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    try {
        userScheme.find()
            .skip(desde)
            .limit(limite)
            .exec((err, users) => {
                // Contar usuarios
                userScheme.count((err, conteo) => {
                    res.json({
                        ok: true,
                        users,
                        cuantos: conteo
                    });
                });
            })
    } catch (error) {
        res.json({
            ok: false,
            message: 'Error al listar los usuarios'
        })
    }
});

// Editar usuarios
app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    //let body = _.pick(req.body, ['usuario', 'contraseña', 'role']);
    try {
        //userScheme.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }, () => {
        userScheme.findByIdAndUpdate(id, req.body, { new: true, runValidators: false }, () => {
            try {
                res.json({
                    ok: true,
                    message: 'Usuario actualizado.'
                });
            } catch (err) {
                res.json({
                    message: 'Usuario existente'
                })
            }
        })
    } catch (error) {
        res.json({
            ok: false,
            message: 'Error al actualizar el usuario.'
        })
    }
});

// Borrar usuarios
app.delete('/usuario/:id', async(req, res) => {
    let id = req.params.id;

    try {
        await userScheme.findByIdAndDelete(id, () => {
            res.json({
                ok: true,
                message: 'Usuario eliminado.'
            });
        });
    } catch (error) {
        res.json({
            ok: false,
            message: 'Error al eliminar el usuario.'
        })
    }
});

module.exports = app;