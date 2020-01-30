const mongoose = require('mongoose');

const usuarioModel = mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    sobrenome: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    contas: [{
        idConta: {
            type: Number,
            trim: true
        },
        accessToken: {
            type: String,
            trim: true
        },
        refreshToken: {
            type: String,
            trim: true
        },
        nickname: {
            type: String,
            trim: true
        }
    }]


});

module.exports = mongoose.model('usuario', usuarioModel);