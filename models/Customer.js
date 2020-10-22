var mongoose = require('mongoose');

var CustomerSchema = new mongoose.Schema({
	name: {
		type: String
	},
	contact_no: {
		type:Number
	},
	identity: {
		type: String
	},
	latitude: {
		type: Number
	},
	longitude: {
		type: Number
	},
	service_location: {
		type: String
	},
	purpose_of_service: {
		type: String
	},
	Service: {
		type:String
	}
	// RepairAndRestoration: {
	// 	type: String
	// },
	// ProductionOrInstallation: {
	// 	type: String
	// },
	// SanitationAndCleaning: {
	// 	type: String
	// },
	// SelfCare: {
	// 	type:String
	// }

});

module.exports = mongoose.model('Customer', CustomerSchema);
