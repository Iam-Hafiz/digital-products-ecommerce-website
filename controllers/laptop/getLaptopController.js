//const express = require('express');
const { Laptop } = require("../../model/laptopModel")
const { ObjectId } = require('mongodb')

// all laptops page
const laptopsPage = (req, res) => {
    Laptop.find()
    .then(laptops => {
        res.render('laptops-views/laptop', { title: 'PC portables', laptops});
    })
    .catch(err => console.log(err))
}

// single laptop details
const laptopDetails = (req, res) => {
    const id = req.params.id
    Laptop.findOne({_id: id})
    .then(laptop => {
        res.render('laptops-views/laptop-details', { title: 'détails PC portable', laptop});
    })
    .catch(err => console.log(err))
}

/***************************************************************************************************
 **** find a single laptop, get and post requests
 * *************************************************************************************************/
const findLaptopGet = (req, res) => {
    res.render('laptops-views/find-laptop', { title: 'Trouver un PC'});
}
const findLaptopPost = (req, res) => {
    const id = req.body.id
    if (ObjectId.isValid(id)) {
        Laptop.findOne({ _id: id })
        .then(laptop => {
            res.render('laptops-views/laptop-details', { title: 'détails PC portable', laptop})
        })
        .catch(err => console.log(err))
    } else {
        res.status(500).json({error: 'ID Invalid'})
    }
}
/************************************************************************************************
// access admin only
**************************************************************************************************/
const findLaptopGet_admin = (req, res) => {
    res.render('laptops-views/get-laptop', { title: 'Trouver un PC'});
}

const findLaptopPost_admin = (req, res) => {
    const id = req.body.id
    if (ObjectId.isValid(id)) {
        Laptop.findOne({ _id: id })
        .then(laptop => {
            res.render('laptops-views/manege-laptops', { title: 'détails PC portable', laptop})
        })
        .catch(err => console.log(err))
    } else {
        res.status(500).json({error: 'ID Invalid'})
    }
}

module.exports = {
    laptopsPage,
    laptopDetails,
    findLaptopGet,
    findLaptopPost,
    findLaptopPost_admin,
    findLaptopGet_admin
};