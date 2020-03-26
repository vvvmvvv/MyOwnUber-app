const mongoose = require('mongoose');

const truckSchema = new mongoose.Schema({
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
    types: {
        type: String,
        required: true
    },
    payload: {
        type: String,
        required: true
    },
    dimensions: {
        type: String,
        required: true
    }, 
    driver: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    truckAssigner: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    dates: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('trucks', truckSchema );