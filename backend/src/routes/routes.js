const express = require('express')
const LoginModel = require('../models/userModel')

const routes = express.Router()

routes.get("/", async (req, res) => {
    const logins = await LoginModel.find({})

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

    return res.status(200).json({name, password})
})

routes.post("/login/", async (req, res) => {
    const {name, password} = req.body

    const userExists = await LoginModel.findOne({name, password})
    
    if(!userExists) {
        return res.status(400).json({msg: 'Nome ou senha inválido(s)'})
    }
    
    return res.status(200).json({msg: `${name} está logado(a)`})
})

module.exports = routes