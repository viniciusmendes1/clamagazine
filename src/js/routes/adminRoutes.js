const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Modelo de usuário
const checkRole = require('../middlewares/checkRole'); // Middleware de autorização

// Rota para remover usuários de exemplo
router.delete('/remove-sample-users', checkRole('admin'), async (req, res) => {
    try {
        await User.deleteMany({ email: /example.com$/ }); // Exemplo: remover usuários com email de exemplo
        res.status(200).send('Usuários de exemplo removidos com sucesso');
    } catch (error) {
        res.status(400).send('Erro ao remover usuários de exemplo: ' + error.message);
    }
});

module.exports = router;