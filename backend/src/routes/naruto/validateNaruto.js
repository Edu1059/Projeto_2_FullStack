const {body} = require('express-validator')

const validateNaruto = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Nome não pode ser vazio!'),
    body('category').notEmpty().withMessage('Selecione uma categoria!'),
]

module.exports = validateNaruto