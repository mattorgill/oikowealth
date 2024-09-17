const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxLength: 40
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 15
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 15
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'manager', 'user'],
        default: 'user',
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('User', UserSchema)