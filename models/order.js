const mongoose = require('mongoose');

const order = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    items: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product', 
            },
            name : {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    total_price: {
        type: Number,
        required: true
    },
    total_items: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('order', order);