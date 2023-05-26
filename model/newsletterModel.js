const mongoose = require('mongoose');

/*************************************************************************************************************************************
 * Create newsletter schema
 * ***************************************************************************************************************************************/
const newsletterSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}, { timestamps: true });
// Compile model from schema
const Subscriber = mongoose.model('Subscriber', newsletterSchema);

module.exports = { Subscriber };