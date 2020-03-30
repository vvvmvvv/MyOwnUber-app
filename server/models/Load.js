const mongoose = require('mongoose');

//-------------------------------------------------workflow with Load
// statuses:    - NEW(for just created, but not posted yet loads) --------default
//              - POSTED(Shipper posted his load, searching for driver)
//              - ASSIGNED(Driver found and assigned)
//              - SHIPPED(finished shipment, history)
//--------------------------------------------------------------------

const loadSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    status: {
        type: String,
        required: true,
        default: 'NEW'
    },
    state: {
        type: String,
        default: null
    },  
    dimensions: {
        width:  {type: Number},
        length: {type: Number},
        height: {type: Number},
    },
    payload: {
        type: Number,
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

module.exports = mongoose.model('loads', loadSchema );