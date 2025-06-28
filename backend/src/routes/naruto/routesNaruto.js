const express = require('express')

const NarutoModel = require('../../models/narutoModel')
const redisClient = require('../../config/cache')
const { handleValidation } = require('../handle')
const validateNaruto = require('./validateNaruto')
const {logger, errorLogger} = require('../../config/logger')

const routes = express.Router()

routes.get("/data/:name", async (req, res) => {
    
    try {
        const {name} = req.params
        const cacheKey = `naruto:${name.toLocaleLowerCase()}`
        
        const cached = await redisClient.get(cacheKey)

        if(cached) {
            const resultado = JSON.parse(cached)
            console.log(`Guardado no Redis: ${name}`)
            return res.status(200).json({msg: resultado})
        }

        console.log(`Consultando o banco de dados do Naruto: ${name}...`)
        const data = await NarutoModel.findOne({name: name})
        
        if(!data) {
            logger.info(`Request Naruto NOT FOUND - Method: ${req.method} ${name} | IP: ${req.ip}`)
            return res.status(404).json({msg: `${name} não encontrado!`})
        }

        logger.info(`Request Naruto OK - Method: ${req.method} ${name} | IP: ${req.ip}`)
        await redisClient.setEx(cacheKey, 300, JSON.stringify(data));
        
        return res.status(200).json({ msg: data})
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
})

routes.post("/create", validateNaruto, handleValidation, async (req, res) => {

    const { name, jutsu, village } = req.body

    try {
        
        const nameExists = await NarutoModel.findOne({name})    
        if(nameExists) {
            return res.status(401).json({msg: `${name} já foi adicionado`})
        }
        
        await NarutoModel.create({
            name,
            jutsu, 
            village
        })
        
        await redisClient.del('naruto');

        logger.info(`Dados inseridos com sucesso - Method: ${req.method} | IP: ${req.ip}`)
        return res.status(200).json({ msg: `Personagem ${name} adicionado com sucesso!` })

    } catch (error) {
        errorLogger.error(`Falha ao inserir: Method:${req.method} | IP: ${req.ip}`)
        return res.status(500).json({msg: error.message})
    }
})

module.exports = routes