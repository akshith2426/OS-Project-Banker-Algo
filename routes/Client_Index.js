const express = require('express');
const router = express.Router();
const methodOverride = require('method-override');
// Load Client model
const Client = require('../models/Client');
const { ensureAuthenticated1, forwardAuthenticated1} = require('../config/auth1');


// Dashboard
router.get('/Client_Dashboard', ensureAuthenticated1, (req, res) =>
  res.render('Client_Dashboard', {
    user: req.user
  })
);

//client edit route
router.get('/Client_Dashboard/Edit/:id', ensureAuthenticated1, (req, res) =>
  Client.findById(req.params.id, function (err, foundClient) {
    if (err) {
      res.redirect("/Client_Dashboard")
    } else {
      res.render('Client_Edit', {
        user: req.user,foundClient:foundClient
      })
    }
  })
);

//client edit put route
router.put('/Client_Dashboard/Edit/:id', function (req, resp) {
  console.log(req.params.id);
  console.log(req.body.user);
  Client.findByIdAndUpdate(req.params.id, req.body.user, function (err, updatedClient) {
    if (err) {
      console.log(err);
      resp.redirect('/')
    } else {
      resp.redirect('/Client_Dashboard')
    }
  })
})
//service today put route
router.put('/ServicedToday/Edit/:id', function (req, resp) {
  Client.findByIdAndUpdate({ _id: req.params.id }, { servicedToday: req.body.servicedToday }, function (err, updatedServiceToday) {
    if (err) {
      console.log(err);
      resp.redirect('/');
    } else {
      resp.redirect('/Client_Dashboard')
    }
  })
  
})

module.exports = router;
