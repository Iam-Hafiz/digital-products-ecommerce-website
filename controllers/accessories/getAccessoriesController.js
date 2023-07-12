//const express = require('express');
const { Accessories } = require("../../model/laptopModel")
const { ObjectId } = require('mongodb')

// all accessories page
const accessories_Page = (req, res) => {
    Accessories.find()
    .then(accessories => {
        res.render('accessories-views/accessories', { title: 'accessories', accessories });
    })
    .catch(err => console.log(err))
}

// single accessorie details
const accessories_Details = (req, res) => {
    const id = req.params.id
    if(ObjectId.isValid(id)){
        Accessories.findOne({_id: id})
        .then(accessories => {
            res.render('accessories-views/accessories-details', { title: 'détails accessories', accessories});
        })
        .catch(err => console.log(err))
    } else {
        res.status(500).json({error: 'ID Invalid'})
    }
}

/***************************************************************************************************
 **** find a single accessorie, get and post requests
 * *************************************************************************************************/
const findAccessories_Get = (req, res) => {
    res.render('accessories-views/find-accessories', { title: 'Trouver des accessories'});
}
const findAccessories_Post = (req, res) => {
    const id = req.body.id
    if (ObjectId.isValid(id)) {
        Accessories.findOne({ _id: id })
        .then(accessories => {
            res.render('accessories-views/accessories-details', { title: 'détails accessories', accessories})
        })
        .catch(err => console.log(err))
    } else {
        res.status(500).json({error: 'ID Invalid'})
    }
}
/************************************************************************************************
// access admin only
**************************************************************************************************/
const findAccessoriesGet_admin = (req, res) => {
    res.render('accessories-views/get-accessories', { title: 'Trouver des accessories'});
}

const findAccessoriesPost_admin = (req, res) => {
    const id = req.body.id
    if (ObjectId.isValid(id)) {
        Accessories.findOne({ _id: id })
        .then(accessories => {
            res.render('accessories-views/manege-accessories', { title: 'détails des accessories', accessories})
        })
        .catch(err => { 
            console.log(err);
        })
    } else {
        res.status(500).json({error: 'ID Invalid'})
    }
}

module.exports = {
    accessories_Page,
    accessories_Details,
    findAccessories_Get,
    findAccessories_Post,
    findAccessoriesPost_admin,
    findAccessoriesGet_admin
};