const { AllinOne } = require("../../model/laptopModel")
const { ObjectId } = require('mongodb')

// all laptops page
const allinOnePage = (req, res) => {
    AllinOne.find()
    .then(allinOnes => {
        res.render('allinOne-views/allinOne', { title: 'Tout en un', allinOnes});
    })
    .catch(err => {
        console.log(err)
        res.redirect('/');
    })
}

// single laptop details
const allinOneDetails = (req, res) => {
    const id = req.params.id
    if(ObjectId.isValid(id)){
        AllinOne.findOne({_id: id})
        .then(allinOne => {
            res.render('allinOne-views/allinOne-details', { title: 'détails Tout en un', allinOne});
        })
        .catch(err => {
            console.log(err)
            res.redirect('/');
        })
    } else {
        res.status(500).json({error: 'ID Invalid'})
    }
}

module.exports = {
    allinOnePage,
    allinOneDetails
};