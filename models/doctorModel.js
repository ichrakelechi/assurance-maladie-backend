const { number } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let DoctorSchema = new Schema({
        name: String,
        adress : String,
        city : String,
        MAPlocation: String,
        mobile : String,
    },
    {
        versionKey: false
    });

// Export the model
module.exports = mongoose.model('Doctor', DoctorSchema, 'Doctor');
