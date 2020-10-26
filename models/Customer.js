var mongoose = require('mongoose');
var t = new Date();
var mumbai_offset = 5.5 * 60;
t.setMinutes(t.getMinutes() + mumbai_offset);
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
	// service_location: {
	// 	type: String
	// },
	area_of_service1: {
		type: String
	},
	area_of_service2: {
		type: String
	},
	area_of_service3: {
		type: String
	},
	area_of_service4: {
		type: String
	},
	area_of_service5: {
		type: String
	},
	area_of_service6: {
		type: String
	},
	area_of_service7: {
		type: String
	},
	area_of_service8: {
		type: String
	},
	carpenterTime: {
		type: Number,
		default:0
	},
	carpenter: {
		type: Number,
		default:0
	},
	plumberTime: {
		type: Number,
		default:0
	},
	plumber: {
		type: Number,
		default:0
	},
	electricianTime: {
		type: Number,
		default:0
	},
	electrician: {
		type: Number,
		default:0
	},
	garbage_collectorTime: {
		type: Number,
		default: 0
	},
	garbage_collector: {
		type: Number,
		default:0
	},
	pestcontrollerTime: {
		type: Number,
		default:0
	},
	pestcontroller: {
		type: Number,
		default:0
	},
	barberTime: {
		type: Number,
		default:0
	},
	barber: {
		type: Number,
		default:0
	},
	cleanerTime: {
		type: Number,
		default:0
	},
	cleaner: {
		type: Number,
		default:0
	},
	painterTime: {
		type: Number,
		default:0
	},
	painter: {
		type: Number,
		default:0
	},
	date: {
        type: Date,
        default: t
}
	// Service: {
	// 	type:String
	// }
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
