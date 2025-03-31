function checkRole(role) {
    return function(req, res, next) {
        if (!req.user || req.user.role !== role) {
            return res.status(403).send('Acesso negado');
        }
        next();
    }
}

module.exports = checkRole;