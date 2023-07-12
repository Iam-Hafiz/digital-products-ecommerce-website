//const express = require('express');
const { Laptop, AllinOne, Monitor, Tablette, Smartphone, Accessories } = require("../../model/laptopModel")

const getProducts = async (req, res) => {
    try {
        const laptops = await Laptop.find();
        const allinOnes = await AllinOne.find()
        const monitors = await Monitor.find()
        const tablettes = await Tablette.find()
        const smartphones = await Smartphone.find()
        const accessories = await Accessories.find()
        const products = [];
        //await Monitor.updateMany({}, {$set:{price: 7000} }); 
        laptops.forEach(laptop => {
            products.push(laptop);
        });
        allinOnes.forEach(allinOne => {
            products.push(allinOne);
        });
        monitors.forEach(monitor => {
            products.push(monitor);
        });
        tablettes.forEach(tablette => {
            products.push(tablette);
        });
        smartphones.forEach(smartphone => {
            products.push(smartphone);
        });
        accessories.forEach(accessorie => {
            products.push(accessorie);
        });
        if(laptops && allinOnes && monitors && tablettes && smartphones && accessories && products){
            //console.log(laptopsArr);
            res.status(201).json({ products });
        }
    }
    catch(err){
        console.log(err)
        res.status(400).json({ error: true });
    }
}

module.exports = { getProducts };




