const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
}

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El email es necesario'],
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
        required: false,
    },
    rol: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

// Antes de retornar el obejeto creado, se ejecuta el siguiente método.
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObjetct = user.toObject();
    delete userObjetct.password;

    return userObjetct;
}

usuarioSchema.plugin( uniqueValidator, { message: '{PATH} email debe ser único'} );


module.exports = mongoose.model('Usuario', usuarioSchema);