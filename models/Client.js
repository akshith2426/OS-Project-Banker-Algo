const mongoose = require('mongoose');
var t = new Date();
var mumbai_offset = 5.5 * 60;
t.setMinutes(t.getMinutes() + mumbai_offset);
const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: { 
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  contact_no: {
    type: Number,
    required:true
  },
  identity: {
  type: String,
  required: true
},
  latitude: {
  type: Number,
  required: true
},
  longitude: {
  type: Number,
  required: true
},
  Service1: {
  type: String
},
  Service2: {
  type: String
},
  Service3: {
  type: String
},
  Service4: {
  type: String
  },
  Service5: {
  type: String
  },
  Service6: {
  type: String
  },
  Service7: {
  type: String
  },
  Service8: {
  type: String
},
  plumber: {
    type: Number,
    default:0
  },
  plumberTime: {
    type: Number,
    default:0
},
  garbage_collector: {
    type: Number,
    default:0
  },
  garbage_collectorTime: {
    type: Number,
    default:0
},
  carpenter: {
  type: Number,
    default:0
  },
  carpenterTime: {
  type: Number,
    default:0
},
  painter: {
  type: Number,
    default:0
  },
  painterTime: {
  type: Number,
    default:0
  },
  cleaner: {
  type: Number,
    default:0
  },
  cleanerTime: {
  type: Number,
    default:0
  },
  electrician: {
  type: Number,
    default:0
  },
  electricianTime: {
  type: Number,
    default:0
  },
  barber: {
  type: Number,
    default:0
  },
  barberTime: {
  type: Number,
    default:0
  },
  pest_controller: {
  type: Number,
    default:0
  },
  pest_controllerTime: {
  type: Number,
    default:0
  },
  servicedToday: {
    type: Boolean,
    default:false
  },
  date: {
  type: Date,
  default: t
}
});

const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;
