const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let DentalSchema = new Schema({
        type: String,
        date: Date,
        tooth : String,
        coefficient: Number,
        fees: Number,
        montant: Number,
        id_bulletin: Number

    },
    {
        versionKey: false
    });

// Export the model
module.exports = mongoose.model('Dental', DentalSchema, 'Dental');
