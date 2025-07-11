const jwt = require('jsonwebtoken');
require('dotenv').config();

const tokenValido = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if(!authHeader) {
        return res.status(401).json({ msg: "Token não existe" });
    }

    const token = authHeader.split(' ')[1];

    if(!token) {
        return res.status(401).json({msg: "Acesso negado"});
    }

    try {
        const secret = process.env.SECRET;
        const decodedJWT = jwt.verify(token, secret); 

        if(decodedJWT.logged === true) {
            next();
        } 
    } catch (error) {
        return res.status(400).json({msg: "Token inválido", error: error.message});
    }
}

module.exports =  {tokenValido};