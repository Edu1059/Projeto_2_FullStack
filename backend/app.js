const express = require('express')
const expressSanitizer = require('express-sanitizer')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const compression = require('compression')

const routesLogin = require('./src/routes/login/routesLogin')

require('./src/config/conn')

const app = express()

app.use(cors({
    origin: 'https://localhost:3000'
}))

app.use(morgan('dev'))
app.use(compression())
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))

app.use(expressSanitizer(), routesLogin)

module.exports = app