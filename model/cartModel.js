const mongoose = require('mongoose');

// Create a shopping cart schema
const cartSchema = mongoose.Schema({
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
        },
        productType: {
            type: String,
            required: true
        }
    }]
}, { timestamps: true });

const Cart = mongoose.model('cart', cartSchema);

module.exports = { Cart };