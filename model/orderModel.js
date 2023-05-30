const mongoose = require('mongoose');

// Create order schema
const orderSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },

    products: [ {
        productId: {
        type: String,
        required: true
        },
        quantity: {
            type: Number,
            default: 1
        },
        title: {
            type: String,
            required: true
        }
    }],

    totalProducts: { 
        type: Number,
        required: true
     },

    totalPrice: {
        type: Number,
        required: true
    },

    currency : {
        type: String,
        default: 'Euro'
    },

    address: Object,
    status: {
        type: String,
        default: 'pending'
    }

}, { timestamps: true });

const Order = mongoose.model('order', orderSchema);

module.exports = { Order };