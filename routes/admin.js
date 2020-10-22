const express = require('express');
const router = express.Router();
const methodOverride = require('method-override');
const bcrypt = require('bcryptjs');
const passport = require('passport');

//New_Worker Model
const New_Worker = require('../models/Admin');


// Register Post Route
router.post('/Admin/Register', (req, res) => {
	const { name, email, password, password2, contact_no } = req.body;
	let errors = [];

	if (!name || !email || !password || !password2 || !contact_no) {
		errors.push({ msg: 'Please enter all fields' });
	}

	if (password != password2) {
		errors.push({ msg: 'Passwords do not match' });
	}

	if (password.length < 6) {
		errors.push({ msg: 'Password must be at least 6 characters' });
	}

	if (errors.length > 0) {
		res.render('Admin_Register', {
			errors,
			name,
			email,
			password,
			password2,
			contact_no
		});
	} else {
		Admin_Login.findOne({ email: email }).then(user => {
			if (user) {
				errors.push({ msg: 'Email already exists' });
				res.render('Admin_Register', {
					errors,
					name,
					email,
					password,
					password2,
					contact_no
				});
			} else {
				const newAdmin = new Admin_Login({
					name,
					email,
					password,
					contact_no
				});

				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newAdmin.password, salt, (err, hash) => {
						if (err) throw err;
						newAdmin.password = hash;
						newAdmin
							.save()
							.then(user => {
								req.flash(
									'success_msg',
									'You are now registered and can log in'
								);
								res.redirect('/Admin/Login');
							})
							.catch(err => console.log(err));
					});
				});
			}
		});
	}
});

// Login Post Route
router.post('/Admin/Login', (req, res, next) => {
	passport.authenticate('local', {
		successRedirect: '/Admin',
		failureRedirect: '/Admin/Login',
		failureFlash: true
	})(req, res, next);
});

// Logout
router.get('/Admin/Logout', (req, res) => {
	req.logout();
	req.flash('success_msg', 'You are logged out');
	res.redirect('/Admin/Login');
});


//Admin Page and show all workers
router.get('/Admin', (req, resp) => {
	New_Worker.find({}, function(err, allworkers) {
		if (err) {
			console.log(err);
		} else {
			resp.render('Admin_Dashboard', { allworkers: allworkers, user: req.user });
		}
	});
});

router.get('/Admin/new_worker', function(req, resp) {
	resp.render('new_worker');
});

router.post('/Admin/new_worker', (req, resp) => {
	var worker_name = req.body.worker_name;
	var worker_age = req.body.worker_age;
	var gender = req.body.gender;
	var profession = req.body.profession;
	var Worker = { worker_name: worker_name, worker_age: worker_age, gender: gender, profession: profession };
	New_Worker.create(Worker, function(err, newlyCreated) {
		if (err) {
			console.log(err);
			resp.redirect('/Admin/new_worker');
		} else {
			resp.redirect('/Admin');
		}
	});
});

//edit present worker info
router.get('/Admin/:id/edit', function(req, resp) {
	New_Worker.findById(req.params.id, function(err, foundWorker) {
		if (err) {
			resp.redirect('/Admin');
		} else {
			resp.render('edit_worker', { foundWorker: foundWorker });
		}
	});
});
//updating the worker details
router.put('/Admin/:id', function(req, resp) {
	New_Worker.findByIdAndUpdate(req.params.id, req.body.foundWorker, function(err, updatedWorker) {
		if (err) {
			console.log(err);
			resp.redirect('/');
		} else {
			resp.redirect('/Admin');
		}
	});
});

//deleting worker
router.delete('/Admin/:id', function(req, resp) {
	New_Worker.findByIdAndRemove(req.params.id, function(err) {
		if (err) {
			resp.redirect('/');
			console.log(err);
		} else {
			resp.redirect('/Admin');
		}
	});
});
module.exports = router;
