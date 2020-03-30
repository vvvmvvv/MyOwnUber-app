const mongoose = require('mongoose');

//-------------------------------------------------work flow with truck
// status: IS(in service) ----------->>> OL(on load)

// type:  - sprinter(300*250*170, 1700),
//        - small straight(500*250*170, 2500),
//        - large straight(700*350*200, 4000) 
//--------------------------------------------------------------------


const truckSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    status: {
        type: String,
        required: true,
        default: 'IS'
    },
    type: {
        type: String,
        required: true
    },
    created_by: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    assigned_to: {
        type: mongoose.Types.ObjectId,
        default: null
    },
    dates: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('trucks', truckSchema );