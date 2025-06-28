const express = require('express')
const expressSanitizer = require('express-sanitizer')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const compression = require('compression')

const routesLogin = require('./src/routes/login/routesLogin')
const routesNaruto = require('./src/routes/naruto/routesNaruto')
const tokenAuth = require('./src/routes/tokenAutenticate')

require('./src/config/conn')

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true
}))

app.use(morgan('dev'))
app.use(compression())
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))

app.use('/home', expressSanitizer(), routesLogin)
app.use('/naruto', tokenAuth.tokenValido, routesNaruto)

module.exports = app