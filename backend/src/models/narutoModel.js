const mongoose = require('mongoose')

const NarutoSchema = mongoose.Schema({
    name: {type: String, require: true},
    category: {type: String, require: true}
})

module.exports = mongoose.model('Naruto', NarutoSchema)