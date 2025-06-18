const mongoose = require('mongoose')

require('dotenv').config()

const url = process.env.MONGO_URL

const conn = mongoose.connect(url, {
    maxPoolSize: 15,
    minPoolSize: 1,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 5000,
}).then(() => {
    console.log(`MongoDB connect sucessful`)
}).catch((err) => {
    console.error({msg: `Error DB: ${err.message}`})
})

module.exports = conn