var mongoose = require('mongoose');
var d = new Date();
var mumbai_offset = 5.5 * 60;
d.setMinutes(d.getMinutes() + mumbai_offset);
var Worker_Attendance_Schema = new mongoose.Schema({
	name: {
		type: String
	},
	contact_no: {
		type:String
	},
	resource: {
		type: String
	},
	latitude: {
		type: Number
	},
	longitude: {
		type: Number
	},
	attendance: {
		type: String
	},
	date: {
		type: Date,
		default: d
	},
	freetime: {
		type: Date,
		default: d
	}
});
module.exports = mongoose.model('Worker_Attendance', Worker_Attendance_Schema);
