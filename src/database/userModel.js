const mongoose = require('mongoose')
const crypto = require('node:crypto')

const user = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        set: (value) => crypto.createHash('md5').update(value).digest('hex')
    }
})


module.exports = mongoose.model('user', user)