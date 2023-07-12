const { Smartphone } = require("../../model/laptopModel")
const { ObjectId } = require('mongodb')

// all smartphones page
const smartphone_Page = (req, res) => {
    Smartphone.find()
    .then(smartphones => {
        res.render('smartphones-views/smartphone', { title: 'smartphone', smartphones });
    })
    .catch(err => console.log(err))
}

// single smartphone details
const smartphone_Details = (req, res) => {
    const id = req.params.id
    if(ObjectId.isValid(id)){
        Smartphone.findOne({_id: id})
        .then(smartphone => {
            res.render('smartphones-views/smartphone-details', { title: 'détails de smartphone', smartphone});
        })
        .catch(err => console.log(err))
    } else {
        res.status(500).json({error: 'ID Invalid'})
    }
}

/***************************************************************************************************
 **** find a single smartphone, get and post requests
 * *************************************************************************************************/
const findSmartphone_Get = (req, res) => {
    res.render('smartphones-views/find-smartphone', { title: 'Trouver un smartphone'});
}
const findSmartphone_Post = (req, res) => {
    const id = req.body.id
    //console.log(req.body)
    if (ObjectId.isValid(id)) {
        Smartphone.findOne({ _id: id })
        .then(smartphone => {
            res.render('smartphones-views/smartphone-details', { title: 'détails smartphone', smartphone})
        })
        .catch(err => console.log(err))
    } else {
        res.status(500).json({error: 'ID Invalid'})
    }
}
/************************************************************************************************
// access admin only
**************************************************************************************************/
const findSmartphoneGet_admin = (req, res) => {
    res.render('smartphones-views/get-smartphone', { title: 'Trouver un smartphone'});
}

const findSmartphonePost_admin = (req, res) => {
    const id = req.body.id
    //console.log(req.body)
    if (ObjectId.isValid(id)) {
        Smartphone.findOne({ _id: id })
        .then(smartphone => {
            res.render('smartphones-views/manege-smartphones', { title: 'détails des smartphone', smartphone })
        })
        .catch(err => console.log(err))
    } else {
        res.status(500).json({error: 'ID Invalid'})
    }
}

module.exports = {
    smartphone_Page,
    smartphone_Details,
    findSmartphone_Get,
    findSmartphone_Post,
    findSmartphonePost_admin,
    findSmartphoneGet_admin
};