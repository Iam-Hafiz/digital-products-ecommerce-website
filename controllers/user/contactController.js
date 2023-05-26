const { Contacts_message } = require("../../model/contactModel")

const saveMessage = (req, res) => {
    const { lastname, email, message } = req.body
    const newContactMsg = new Contacts_message({ lastname, email, message })
        newContactMsg.save()
        .then((result) => {
        res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
        })
}

module.exports = saveMessage;