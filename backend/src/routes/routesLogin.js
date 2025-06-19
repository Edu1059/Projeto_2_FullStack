const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

require('dotenv').config()

const LoginModel = require('../models/userModel')
const redisClient = require('../config/cache')

const { handleValidation } = require('../routes/handle')
const validateLogin = require('../routes/validateLogin')

const routes = express.Router()

routes.get("/", async (req, res) => {

    const cacheKey = 'logins'
    const cached = await redisClient.get(cacheKey);

    if (cached) {
      return res.status(200).json(JSON.parse(cached));
    }

    console.log("Consultando o banco de dados...")
    
    const logins = await LoginModel.find({})
    
    await redisClient.setEx(cacheKey, 300, JSON.stringify(logins));

    return res.status(200).json(logins)
})

routes.post("/create/", validateLogin, handleValidation, async (req, res) => {
    
    try {
        
        const {name, password} = req.body
        const userExists = await LoginModel.findOne({name})
    
        if(userExists) {
            return res.status(400).json({msg: `Usuário ${name} já existe`})
        }
        const hashedPass = await bcrypt.hash(password, 10)
        
        await LoginModel.create({
            name,
            password: hashedPass
        })

        await redisClient.del('logins');
        
        return res.status(200).json({name, password})
        
    } catch (error) {
        return res.status(500).json({err: 'Error! ' + error.message })
    }
})

routes.post("/login/", async (req, res) => {
    
    const name = req.sanitize(req.body.name)
    const password = req.sanitize(req.body.password);

    try {

        const userExists = await LoginModel.findOne({name})
    
        if(!userExists) {
            return res.status(400).json({msg: 'Usuário não existe!'})
        }
        const hashConfirm = await bcrypt.compare(password, userExists.password)

        if(!hashConfirm) {
            return res.status(401).json({msg: 'Senha inválida!'})
        } else {
            const secret = process.env.SECRET
            const token = jwt.sign({
                _id: userExists._id,
                name
            }, secret)
        
            return res.status(200).json({msg: `${name} está logado(a)`, token})
        }

    } catch (error) {
        return res.status(500).json({err: 'Erro ao inserir dados!'})
    }
})

module.exports = routes