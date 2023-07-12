//const express = require('express');
const { Tablette } = require("../../model/laptopModel")
const { ObjectId } = require('mongodb')

// all laptops page
const tablettes_Page = (req, res) => {
    Tablette.find()
    .then(tablettes => {
        res.render('tablettes-views/tablette', { title: 'tablettes', tablettes });
    })
    .catch(err => console.log(err))
}

// single laptop details
const tablette_Details = (req, res) => {
    const id = req.params.id
    if(ObjectId.isValid(id)){
        Tablette.findOne({_id: id})
        .then(tablette => {
            res.render('tablettes-views/tablette-details', { title: 'détails PC portable', tablette});
        })
        .catch(err => console.log(err))
    } else {
        res.status(500).json({error: 'ID Invalid'})
    }
}

/***************************************************************************************************
 **** find a single laptop, get and post requests
 * *************************************************************************************************/
const findTablette_Get = (req, res) => {
    res.render('tablettes-views/find-tablette', { title: 'Trouver une tablette'});
}
const findTablette_Post = (req, res) => {
    const id = req.body.id
    if (ObjectId.isValid(id)) {
        Tablette.findOne({ _id: id })
        .then(tablette => {
            res.render('tablettes-views/tablette-details', { title: 'détails tablette', tablette})
        })
        .catch(err => console.log(err))
    } else {
        res.status(500).json({error: 'ID Invalid'})
    }
}
/************************************************************************************************
// access admin only
**************************************************************************************************/
const findTabletteGet_admin = (req, res) => {
    res.render('tablettes-views/get-tablette', { title: 'Trouver une tablette'});
}

const findTablettePost_admin = (req, res) => {
    const id = req.body.id
    if (ObjectId.isValid(id)) {
        Tablette.findOne({ _id: id })
        .then(tablette => {
            res.render('tablettes-views/manege-tablettes', { title: 'détails des tablettes', tablette})
        })
        .catch(err => console.log(err))
    } else {
        res.status(500).json({error: 'ID Invalid'})
    }
}

module.exports = {
    tablettes_Page,
    tablette_Details,
    findTablette_Get,
    findTablette_Post,
    findTablettePost_admin,
    findTabletteGet_admin
};