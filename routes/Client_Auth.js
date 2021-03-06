const express = require('express');
const router = express.Router();
const bcrypt1 = require('bcryptjs');
const passport = require('passport');
const twilio = require('twilio');
var nodemailer = require('nodemailer');

require('dotenv').config();
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

var message_sender = new twilio(process.env.KEY_1,process.env.KEY_2);
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
  var obj_array=[req.body.Service1,req.body.Service2,
		req.body.Service3,req.body.Service4,
		req.body.Service5,req.body.Service6,
    req.body.Service7, req.body.Service8]
    var i=0;
	  var work = 'You Have Requested Services For :-';
	for (i = 0; i < 8; i++)
	{
	if (obj_array[i] != null) {
		work=work+'\n'+obj_array[i];
		i = i + 1;
	}}
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
        message_sender.messages.create({
                to: contact_no,
				        from: '+19152282797',
			          body:'Greetings ' + name +'\nYou Have Been Registered As A Client At Rural Housie \nWe Will Get Back To You With Further Details'
        })
        var mailOptions = {
                                from: 'rakeshparag876@gmail.com',
                                to: email,
                                subject: 'Successful Registration Of Client',
				html: `<h2>Welcome ${name}</h2>
						<h4>You have successfully registered as a Client at Rural Housie.</h4>
						<h4>You will be recieving requested workers as requested on a regular basis</h4>
						<h3>${work}</h3>
						<p style="font-size: medium;font-weight: bolder;">For More Queries,
                    Please contact through our mail address <a href="mailto:rakeshparag876@gmail.com" style="text-decoration: none;">Rural Housie</a> and our social media handles</p>`
            };

            transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                            console.log(error);
                    } else {
                            console.log('Email sent: ' + info.response);
                    }
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
