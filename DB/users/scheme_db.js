const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    usuario: {
        type: String,
        required: [true, 'Nombre es requerido.']
    },
    contraseña: {
        type: String,
        required: [true, 'Contraseña es requerida.']
    }
});

//
module.exports = mongoose.model('usuarios_registrados', userSchema);