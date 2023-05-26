const express = require('express');
const { User } = require("../../model/userModel")
const { handleErrors } = require("./authController")

module.exports.signup_get = (req, res) => {
  res.render('users-views/signup', {title: 'S\'enregistrer'});
}

module.exports.signup_post = async (req, res) => {
    const { firstname, lastname, birthday, email, password, Address, phoneNumber, zipCode, city, country } = req.body;
    try {
      const user = await User.create({ firstname, lastname, birthday, email, password, Address, phoneNumber, zipCode, city, country });
      if(user._id) {
        res.status(201).json({ user: true });
      }
    }
    catch(err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
}


