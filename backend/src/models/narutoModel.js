const mongoose = require('mongoose')

const NarutoSchema = mongoose.Schema({
    name: {type: String, require: true},
    jutsu: {type: String, require: true},
    village: {type: String, require: true}
})

module.exports = mongoose.model('Naruto', NarutoSchema)