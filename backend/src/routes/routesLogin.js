const express = require('express')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const LoginModel = require('../models/userModel')
const redisClient = require('../config/cache')

const routes = express.Router()

routes.get("/", async (req, res) => {

    const cacheKey = 'logins'
    const cached = await redisClient.get(cacheKey);

    if (cached) {
      console.log('Dados do cache Redis');
      return res.status(200).json(JSON.parse(cached));
    }

    console.log("Consultando o banco de dados...")
    
    const logins = await LoginModel.find({})
    
    await redisClient.setEx(cacheKey, 10, JSON.stringify(logins));

    return res.status(200).json(logins)
})

routes.post("/create/", async (req, res) => {
    const {name, password} = req.body
    const userExists = await LoginModel.findOne({name})

    if(userExists) {
        return res.status(400).json({msg: `Usuário ${name} já existe`})
    }

    await LoginModel.create({
        name,
        password
    })

    await redisClient.del('logins');
    
    return res.status(200).json({name, password})
})

routes.post("/login/", async (req, res) => {
    
    const {name} = req.body
    const password = req.sanitize(req.body.password);

    const userExists = await LoginModel.findOne({name, password})

    if(!userExists) {
        return res.status(400).json({msg: 'Nome ou senha inválido(s)'})
    }
    
    const secret = process.env.SECRET
    const token = jwt.sign({
        _id: userExists._id,
        name
    }, secret)

    return res.status(200).json({msg: `${name} está logado(a)`, token,
    sanitized: password })
})

module.exports = routes