const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let HospitalizationSchema = new Schema({
        dateE: Date,
        dateR: Date,
        amount: Number,
        observation: String,
        id_bulletin: String 
        
    },
    {
        versionKey: false
    });

// Export the model
module.exports = mongoose.model('Hospitalization', HospitalizationSchema, 'Hospitalization');
