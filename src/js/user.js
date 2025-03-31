const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definindo o esquema do usuário
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'colunista'],
        default: 'colunista'
    }
}, {
    timestamps: true
});

// Métodos para verificar as funções do usuário
userSchema.methods.isAdmin = function() {
    return this.role === 'admin';
};

userSchema.methods.isColunista = function() {
    return this.role === 'colunista';
};

module.exports = mongoose.model('User', userSchema);