const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require("../model/userModel");
const dotenv = require("dotenv").config();

const require_user_auth = (req, res, next) => {
  const token = req.cookies.jwtCookie;

  // check json web token exists & is verified
  if (token) {
      /* to generate a secret in node, run node commend in a node js terminal then run:
      > require('crypto').randomBytes(64).toString('hex') =>  'the generated secret' */
    jwt.verify(token, process.env.jwt_secret, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
          if(!decodedToken.isAdmin) {
            //console.log('this is the decodedToken of user')
            //console.log(decodedToken);
            next();
          }
      }
    });
  } else {
    res.redirect('/login');
  }
}
// require admin auth
const require_admin_auth = (req, res, next) => {
  const token = req.cookies.jwtCookie;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.jwt_secret, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        //console.log('this is the decodedToken of admin')
        //console.log(decodedToken);
        if(decodedToken.isAdmin) {
            next();
        } else {
            res.cookie('jwtCookie', '', { maxAge: 1 });
            res.redirect('/login');
        }
      }
    });
  } else {
    res.redirect('/login');
  }
}

// check if the current user is loged in, display his name in the header
const checkUser = (req, res, next) => {
 const token = req.cookies.jwtCookie;
  if (token) {
    jwt.verify(token, process.env.jwt_secret, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.locals.admin = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        if(decodedToken.isAdmin) {
          // the user is admin in this case
            res.locals.user = null;
            res.locals.admin = user.firstname;
            next();
        } else {
          res.locals.admin = null;
          res.locals.user = user.firstname;
          next();
        }
      }
    });
  } else {
    res.locals.user = null;
    res.locals.admin = null;
    next();
  }
}

module.exports = { require_user_auth, require_admin_auth, checkUser };