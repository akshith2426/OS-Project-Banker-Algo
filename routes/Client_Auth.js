const express = require('express');
const router = express.Router();
const bcrypt1 = require('bcryptjs');
const passport = require('passport');
// Load Client model
const Client = require('../models/Client');
const { forwardAuthenticated1 } = require('../config/auth1');

// Login Page
router.get('/Login', forwardAuthenticated1, (req, res) => res.render('Client_Login'));

// Register Page
router.get('/Register', forwardAuthenticated1, (req, res) => res.render('Client_Register'));

// Register
router.post('/Register', (req, res) => {
  const { name, email, password, password2,contact_no, identity, latitude, longitude, Service1, Service2, Service3, Service4,Service5,Service6,Service7,Service8, plumber,plumberTime,garbage_collector,garbage_collectorTime, carpenter,carpenterTime, painter,painterTime,cleaner,cleanerTime,electrician,electricianTime,barber,barberTime,pest_controller,pest_controllerTime } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2 || !contact_no || !identity || !latitude || !longitude) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('Client_Register', {
      errors,
      name,
      email,
      password,
      password2,
      contact_no,
      identity,
      latitude,
      longitude,
      Service1,
      Service2,
      Service3,
      Service4,
      Service5,
      Service6,
      Service7,
      Service8,
      plumber,
      plumberTime,
          garbage_collector,
      garbage_collectorTime,
          carpenter,
      carpenterTime,
          painter,
      painterTime,
          cleaner,
      cleanerTime,
          electrician,
      electricianTime,
          barber,
      barberTime,
          pest_controller,
      pest_controllerTime
    });
  } else {
    Client.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('Client_Register', {
          errors,
          name,
          email,
          password,
          password2,
          contact_no,
          identity,
          latitude,
          longitude,
          Service1,
      Service2,
      Service3,
      Service4,
      Service5,
      Service6,
      Service7,
      Service8,
      plumber,
      plumberTime,
          garbage_collector,
      garbage_collectorTime,
          carpenter,
      carpenterTime,
          painter,
      painterTime,
          cleaner,
      cleanerTime,
          electrician,
      electricianTime,
          barber,
      barberTime,
          pest_controller,
      pest_controllerTime
        });
      } else {
        const newClient = new Client({
          name,
          email,
          password,
          contact_no,
          identity,
          latitude,
          longitude,
      Service1,
      Service2,
      Service3,
      Service4,
      Service5,
      Service6,
      Service7,
      Service8,
          plumber,
      plumberTime,
          garbage_collector,
      garbage_collectorTime,
          carpenter,
      carpenterTime,
          painter,
      painterTime,
          cleaner,
      cleanerTime,
          electrician,
      electricianTime,
          barber,
      barberTime,
          pest_controller,
      pest_controllerTime
        });

        bcrypt1.genSalt(10, (err, salt) => {
          bcrypt1.hash(newClient.password, salt, (err, hash) => {
            if (err) throw err;
            newClient.password = hash;
            newClient
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/Client/Login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/Login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/Client_Dashboard',
    failureRedirect: '/Client/Login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/Logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/Client/Login');
});

module.exports = router;
