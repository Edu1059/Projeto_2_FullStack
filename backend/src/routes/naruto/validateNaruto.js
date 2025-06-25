const {body} = require('express-validator')

const validateNaruto = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Nome não pode ser vazio!'),
    body('jutsu').trim().notEmpty().withMessage('Jutsu não pode ser vazio!'),
    body('village').trim().notEmpty().withMessage('Vila não pode ser vazia!'),
]

module.exports = validateNaruto