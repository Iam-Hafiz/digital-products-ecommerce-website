//const express = require('express');
const { Laptop } = require("../../model/laptopModel")

const getProducts = async (req, res) => {
    try {
        const laptopsArr = await Laptop.find().sort({_id: -1})
        if(laptopsArr){
            //console.log(laptopsArr);
            res.status(201).json({ laptopsArr });
        }
    }
    catch(err){
        console.log(err)
        res.status(400).json({ error: true });
    }
}

module.exports = { getProducts };

