const express = require('express')
const expressSanitizer = require('express-sanitizer')

const bodyParser = require('body-parser')
const routesLogin = require('./src/routes/routesLogin')

require('./src/config/conn')

const app = express()

app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))

app.use(expressSanitizer(), routesLogin)

module.exports = app