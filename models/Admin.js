var mongoose = require('mongoose');

var NewWorkerSchema = new mongoose.Schema({
	worker_name: {
		type: String
	},
	worker_age: {
		type: Number
	},
	gender: {
		type: String
	},
	profession: {
		type: String
	}
});
module.exports = mongoose.model('New_Worker', NewWorkerSchema);
