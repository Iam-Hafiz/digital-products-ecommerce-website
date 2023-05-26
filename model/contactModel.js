const mongoose = require('mongoose');

/**********************************************************************************************************************************************
 *  contact us
 * *******************************************************************************************************************************************/
 // Create contact us schema
const contactSchema = mongoose.Schema({
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subject: String,
    message: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Compile model from schema
const Contacts_message = mongoose.model('Contacts_message', contactSchema);

module.exports = { Contacts_message };