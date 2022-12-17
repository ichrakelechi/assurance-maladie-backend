const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ArrangementSchema = new Schema({
        name: String,
        nomenclature : String,
        amount: Number,
        id_bulletin: String

    },
    {
        versionKey: false
    });

// Export the model
module.exports = mongoose.model('Arrangement', ArrangementSchema, 'Arrangement');
