const https = require('https')
const fs = require('fs')
const app = require('./app')

require('dotenv').config()

const port = process.env.PORT

const options = {
    key: fs.readFileSync('code.key'),
    cert: fs.readFileSync('code.crt')
}

https.createServer(options, app).listen(port, () => {
    console.log(`Server running at https://localhost:${port}`)
})