const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

require('dotenv').config()

const LoginModel = require('../../models/userModel')
const redisClient = require('../../config/cache')
const { handleValidation } = require('../handle')
const validateLogin = require('./validateLogin')
const {logger, errorLogger} = require('../../config/logger')

const routes = express.Router()

routes.post("/create/", validateLogin, handleValidation, async (req, res) => {
    
    try {
        
        const {name, password} = req.body
        const userExists = await LoginModel.findOne({name})
    
        if(userExists) {
            errorLogger.error(`Falha ao criar usuário: Method: ${req.method} | IP: ${req.ip}`)
            return res.status(400).json({msg: `Usuário ${name} já existe`})
        }

        const hashedPass = await bcrypt.hash(password, 10)
        
        await LoginModel.create({
            name,
            password: hashedPass
        })

        await redisClient.del('logins');

        logger.info(`Usuário criado com sucesso - Method: ${req.method} | IP: ${req.ip}`)
        return res.status(200).json({name, password})
        
    } catch (error) {
        errorLogger.error(`Falha ao criar usuário: Method:${req.method} | IP: ${req.ip}`)
        return res.status(500).json({err: 'Error! ' + error.message })
    }
})

routes.post("/login/", async (req, res) => {
    
    const name = req.sanitize(req.body.name)
    const password = req.sanitize(req.body.password);

    try {
        
        const userExists = await LoginModel.findOne({name})
        let logged = false
        if(!userExists) {
            errorLogger.error(`Falha de login - Method: ${req.method} | IP: ${req.ip}`);
            return res.status(404).json({ msg: "Usuário não encontrado!" })
        }

        const hashConfirmPass = await bcrypt.compare(password, userExists.password)
        
        if (!hashConfirmPass) {
            errorLogger.error(`Falha de login: ${req.method} | IP: ${req.ip}`);
            return res.status(400).json({msg: 'Credencial(is) inválida(s)!'})

        } else {
            logged = true
            const secret = process.env.SECRET
            const token = jwt.sign({
                _id: userExists._id,
                name,
                logged: true
            }, secret, {
                expiresIn: '10min'
            })
            
            logger.info(`Login sucessful: - Method: ${req.method} | IP: ${req.ip}`)
            return res.status(200).json({msg: `${name} está logado(a)`, token})
        }

    } catch (error) {
        errorLogger.error(`Falha no servidor - Method: ${req.method} | IP: ${req.ip}`);
        return res.status(500).json({err: 'Erro ao inserir dados! ' + error.message})
    }
})

module.exports = routes