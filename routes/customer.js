const express = require('express');
const router = express.Router();

//Customer Model
const Customer = require('../models/Customer');
//Customer Page
router.get('/Customer', (req, resp) => {
	resp.render('customer');
});
router.post('/Customer', function(req, resp) {
	var name = req.body.customer_name;
	var contact_no = req.body.contact_no;
	var identity = req.body.identity;
	var longitude = req.body.longitude;
	var latitude = req.body.latitude;
	var service_location = req.body.service_location;
	var purpose_of_service = req.body.purpose_of_service;
	var Service= req.body.Service;
	// var RepairAndRestoration = req.body.RepairAndRestoration;
	// var ProductionOrInstallation = req.body.ProductionOrInstallation;
	// var SanitationAndCleaning = req.body.SanitationAndCleaning;
	// var SelfCare = req.body.SelfCare;
	// RepairAndRestoration, ProductionOrInstallation: ProductionOrInstallation, SanitationAndCleaning: SanitationAndCleaning, SelfCare: SelfCare
	var newCustomer = { name: name, contact_no: contact_no, identity: identity, longitude: longitude, latitude: latitude, service_location: service_location, purpose_of_service: purpose_of_service,Service:Service  };
	Customer.create(newCustomer, function(err, newlyCreated) {
		if (err) {
			console.log(err);
			resp.redirect('/Customer');
		} else {
			resp.redirect('/');
		}
	});
});

module.exports = router;
