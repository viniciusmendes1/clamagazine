const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Modelo de usuário
const checkRole = require('../middlewares/checkRole'); // Middleware de autorização

// Rota para criar um novo usuário
router.post('/create', checkRole('admin'), async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const newUser = new User({ name, email, password, role });
        await newUser.save();
        res.status(201).send('Usuário criado com sucesso');
    } catch (error) {
        res.status(400).send('Erro ao criar usuário: ' + error.message);
    }
});

module.exports = router;