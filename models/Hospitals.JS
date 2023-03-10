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

},{
    toJSON: {virtuals:true},
    toObject: {virtuals:true},
});

//Reverse Populate with virtuals
HospitalSchma.virtual('appointments',{
    ref: 'Appointment',
    localField: '_id',
    foreignField: 'hospital',
    justOne: false,
});

//Cascade Delete appointment when a hospital is deleted
HospitalSchma.pre('remove', async function(next){
    console.log(`Appointments being removed from hospital ${this._id}`);
    await this.model('Appointment').deleteMany({hospital: this._id});
    next();
});

module.exports = mongoose.model('Hospital',HospitalSchma);