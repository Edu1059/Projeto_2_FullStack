const { body } = require('express-validator')

const validateLogin = [
    body('name').trim().notEmpty().escape().withMessage('Nome não pode ser vazio!'),
    body('name').isLength({ min: 5, max: 15 }).withMessage('Nome deve ter de 5 à 15 caracteres!'),
    body('password').trim().notEmpty().escape().withMessage('Senha não pode ser vazia!'),
    body('password').isLength({ min: 5, max: 15 }).withMessage('Senha deve ter de 5 à 10 caracteres!'),
]

module.exports = validateLogin 