const express = require('express');
const router = express.Router();

//Worker Model
const Worker_Attendance = require('../models/Worker_Attendance');
//New_Worker Model
const New_Worker = require('../models/Admin');
var workerlist = [];
var temp_array = [];
// New_Worker.find({}, function(err, allworkers) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		// allworkers.forEach(function(param, i) {
// 		// 	workerlist.push(param[i]);
// 		// });
// 		workerlist = allworkers;
		
// 	}
// });
function getUnique(array) {
	var uniqueArray = [];

	// Loop through array values
	for (var value of array) {
		if (uniqueArray.indexOf(value) === -1) {
			uniqueArray.push(value);
		}
	}
	return uniqueArray;
}
//Worker  Page
router.get('/Worker', (req, resp) => {
	New_Worker.find({}, function (err, allworkers) {
		if (err) {
			console.log(err);
		} else {
			allworkers.forEach(function(param) {
				temp_array.push(param.worker_name);
			});
			workerlist = getUnique(temp_array.sort());
			resp.render('worker',{workerlist:workerlist});
		}

	});
	
});
router.post('/Worker', function (req, resp) {
	console.log(req.body)
	var name = req.body.worker_name;
	var resource = req.body.resource;
	var longitude = req.body.longitude;
	var latitude = req.body.latitude;
	var attendance = req.body.attendance;
	var freetime = new Date();
	var mumbai_offset = 5.5 * 60;
    freetime.setMinutes(freetime.getMinutes() + mumbai_offset);
	if (attendance == "not available") {
		console.log("free time is altered")
		console.log(freetime)
		Date.prototype.addHours = function(h) { 
            this.setTime(this.getTime() + 
                         (h * 60 * 60 * 1000)); 
            return this; 
		} 
		freetime.addHours(16);
		console.log(freetime)
	}
	if (attendance == "available") {
		console.log("freetime is not altered")
	}
	var newWorker = {
		name: name,
		resource: resource,
		longitude: longitude,
		latitude: latitude,
		attendance: attendance,
		freetime:freetime
	};
	Worker_Attendance.create(newWorker, function(err, newlyCreated) {
		if (err) {
			console.log(err);
			resp.redirect('/Worker');
		} else {
			resp.redirect('/');
		}
	});
});

module.exports = router;
