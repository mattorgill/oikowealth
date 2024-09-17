const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    type: {
        type: String,
        enum: ['income', 'expense'],
        default: 'income'
    },
    icon: {
        type: String,
        default: 'unknown'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Category', CategorySchema)