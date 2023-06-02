const { Subscriber } = require("../../model/newsletterModel")

const newsletter = (req, res) => {
    const { firstname, email } = req.body
    const newSubscriber = new Subscriber({ firstname, email })
    newSubscriber.save()
    .then((result) => {
        res.redirect('/');
    })
    .catch((err) => {
        console.log(err);
        res.redirect('/');
    })
}

module.exports = newsletter;