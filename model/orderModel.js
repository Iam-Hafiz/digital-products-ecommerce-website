const mongoose = require('mongoose');

// Create a shopping cart schema
const orderSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    products: [ {
        productId: {
        type: String
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    amount: {
        type: Number,
        required: true
    },
    address: Object,
    status: {
        type: String,
        default: 'pending'
    }
}, { timestamps: true });

const Order = mongoose.model('order', orderSchema);

module.exports = { Order };