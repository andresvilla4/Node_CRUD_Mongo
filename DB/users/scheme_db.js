const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} No es un rol válido'
};

const userSchema = new Schema({
    usuario: {
        type: String,
        required: [true, 'Nombre es requerido.'],
        unique: true
    },
    contraseña: {
        type: String,
        required: [true, 'Contraseña es requerida.']
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    }
});

userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.contraseña;
    return userObject;
}

userSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

// usuarios_registrados es el nombre de la colección usada o creada
module.exports = mongoose.model('usuarios_registrados', userSchema);