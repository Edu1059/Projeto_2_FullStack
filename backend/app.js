const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./src/routes/routes')

require('./src/config/conn')

const app = express()

app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)

module.exports = app