const mongoose = require('mongoose');

// Create laptops schema and model
const laptopSchema = mongoose.Schema({
    title: String,
    image: String,
    description: [{
        type: String,
        required: false
    }],
    price: {
        type: Number,
        required: true
    },
    quantity: Number,
    productsInCart: {
        type: Number,
        default: 0
    }

}, { timestamps: true });
// Compile model from schema
const Laptop = mongoose.model('laptop', laptopSchema);

const AllinOne = mongoose.model('allinOne', laptopSchema);

const Monitor = mongoose.model('monitor', laptopSchema);

module.exports = { Laptop, AllinOne, Monitor };









