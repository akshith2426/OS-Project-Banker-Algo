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
	// var service_location = req.body.service_location;
	var area_of_service1 = req.body.area_of_service1;
	var area_of_service2 = req.body.area_of_service2;
	var area_of_service3 = req.body.area_of_service3;
	var area_of_service4 = req.body.area_of_service4;
	var area_of_service5 = req.body.area_of_service5;
	var area_of_service6 = req.body.area_of_service6;
	var area_of_service7 = req.body.area_of_service7;
	var area_of_service8 = req.body.area_of_service8;
	var carpenterTime = req.body.carpenterTime;
	var carpenter = req.body.carpenter;
	var plumberTime = req.body.plumberTime;
	var plumber = req.body.plumber;
	var electricianTime = req.body.electricianTime;
	var electrician = req.body.electrician;
	var garbage_collectorTime = req.body.garbage_collectorTime;
	var garbage_collector = req.body.garbage_collector;
	var pestcontrollerTime = req.body.pestcontrollerTime;
	var pestcontroller = req.body.pestcontroller;
	var barberTime = req.body.barberTime;
	var barber = req.body.barber;
	var cleanerTime = req.body.cleanerTime;
	var cleaner = req.body.cleaner;
	var painterTime = req.body.painterTime;
	var painter = req.body.painter;
	// var Service= req.body.Service;
	// var RepairAndRestoration = req.body.RepairAndRestoration;
	// var ProductionOrInstallation = req.body.ProductionOrInstallation;
	// var SanitationAndCleaning = req.body.SanitationAndCleaning;
	// var SelfCare = req.body.SelfCare;
	// RepairAndRestoration, ProductionOrInstallation: ProductionOrInstallation, SanitationAndCleaning: SanitationAndCleaning, SelfCare: SelfCare,Service:Service,service_location: service_location,
	var newCustomer = {
		name: name,
		contact_no: contact_no,
		identity: identity,
		longitude: longitude,
		latitude: latitude,
		area_of_service1: area_of_service1,
		area_of_service2: area_of_service2,
		area_of_service3: area_of_service3,
		area_of_service4: area_of_service4,
		area_of_service5: area_of_service5,
		area_of_service6: area_of_service6,
		area_of_service7: area_of_service7,
		area_of_service8: area_of_service8,
		carpenterTime: carpenterTime,
		carpenter:carpenter,
		plumberTime: plumberTime,
		plumber:plumber,
		electricianTime: electricianTime,
		electrician: electrician,
		garbage_collectorTime: garbage_collectorTime,
		garbage_collector:garbage_collector,
		pestcontrollerTime: pestcontrollerTime,
		pestcontroller:pestcontroller,
		barberTime: barberTime,
		barber:barber,
		cleanerTime: cleanerTime,
		cleaner: cleaner,
		painterTime: painterTime,
		painter:painter
	};
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
