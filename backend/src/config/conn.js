const mongoose = require('mongoose')

require('dotenv').config()

const url = process.env.MONGO_URL

const conn = mongoose.connect(url).then(() => {
    console.log(`DB connect sucessful`)
}).catch((err) => {
    console.error({msg: `Error DB: ${err.message}`})
})

module.exports = conn