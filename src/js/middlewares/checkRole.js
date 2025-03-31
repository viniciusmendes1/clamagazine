const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

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

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
const User = require('../models/user'); // Certifique-se de que o modelo User é importado uma vez

module.exports = function (role) {
    return function (req, res, next) {
        if (req.user && req.user.role === role) {
            next();
        } else {
            res.status(403).send('Acesso negado');
        }
    };
};
const User = require('../models/user'); // Certifique-se de que o modelo User é importado uma vez

module.exports = function (role) {
    return function (req, res, next) {
        if (req.user && req.user.role === role) {
            next();
        } else {
            res.status(403).send('Acesso negado');
        }
    };
};