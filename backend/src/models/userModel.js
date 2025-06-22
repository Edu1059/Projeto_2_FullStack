const mongoose = require('mongoose')

const LoginSchema = mongoose.Schema({
    name: {type: String, require: true}, 
    password: {type: String, require: true}
})

module.exports = mongoose.model('Login', LoginSchema)