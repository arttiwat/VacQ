const mongoose = require('mongoose');

const HospitalSchma = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please add a Name'],
        unique: true,
        trim: true,
        maxlength:[50,'Name can not be more than 50 characters']
    },
    address: {
        type: String,
        required: [true,'Please add a Address']
    },
    district: {
        type: String,
        required: [true,'Please add a District']
    },
    province: {
        type: String,
        required: [true,'Please add a Province']
    },
    postalcode: {
        type: String,
        required: [true,'Please add a Postalcode'],
        maxlength: [5,'Postal Code can not be more than 5 digits']
    },
    tel: {
        type: String
    },
    region: {
        type: String,
        required: [true,'Please add a Region']
    }
});

module.exports = mongoose.model('Hospital',HospitalSchma);