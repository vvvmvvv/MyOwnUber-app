const mongoose = require('mongoose');

const loadSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    status: {
        type: String,
        required: true,
        max: 200,
        min: 1
    },
    state: {
        type: String,
        required: true
    },  
    dimensions: {
        type: String,
        required: true
    },
    payload: {
        type: Number,
        required: true
    },
    shipper: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    loadAssigner: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    dates: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('loads', loadSchema );