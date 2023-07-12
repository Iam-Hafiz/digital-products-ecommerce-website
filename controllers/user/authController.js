const express = require('express');
const { User } = require("../../model/userModel");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config();

/*******************************************************************************
// handle errors functions
*******************************************************************************/
function handleErrors (err) {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    // reasign the incorrect email message
    if (err.message === 'Adresse Email incorrecte') {
      errors.email = 'Cet email n\'est pas enregistré';
    }

    // reasign the "incorrect password" message
    if (err.message === 'Mot de passe incorrect') {
      errors.password = 'Ce mot de passe est incorrect';
    }

    // duplicate email error
    if (err.code === 11000) {
      errors.email = 'cet e-mail est déjà enregistré';
      return errors;
    }

    // validation errors
    if (err.message.includes('user validation failed')) {
      // console.log(err);
      Object.values(err.errors).forEach(({ properties }) => {
        // console.log(properties);
        errors[properties.path] = properties.message;
      });
    }
    return errors;
}
/********************************************************************************
// create json web token
*******************************************************************************/
const maxAge = 60 * 60;
const createToken = (id, isAdmin) => {
  return jwt.sign({ id, isAdmin }, process.env.jwt_secret , {
    expiresIn: maxAge
  });
};
/*******************************************************************************
// login auth and log out
*******************************************************************************/

const login_get = (req, res) => {
  const token = req.cookies.jwtCookie;

  // check json web token exists & is verified
  if (token) {
      /* to generate a secret in node, run node commend in a node js terminal then run:
      > require('crypto').randomBytes(64).toString('hex') =>  'the generated secret' */
    jwt.verify(token, process.env.jwt_secret, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/');
      } else {
          //console.log('this is the decodedToken of user', decodedToken)
          res.cookie('jwtCookie', '', { maxAge: 1 });
          res.render('users-views/login', { title: 'Se connecter'});
      }
    });
  } else {
    res.render('users-views/login', { title: 'Se connecter'});
  }
}

const login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id, user.isAdmin);
    res.cookie('jwtCookie', token, { httpOnly: true, maxAge: maxAge * 1000 });
    if(user.isAdmin){
        res.status(200).json({ admin: true });
    } else {
      if(user._id) {
          res.status(200).json({ user: true });
      }
    }
  }
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}

const logout_get = (req, res) => {
  res.cookie('jwtCookie', '', { maxAge: 1 });
  res.redirect('/');
}

module.exports = {
    handleErrors,
    login_get,
    login_post,
    logout_get
};