const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let reclamationSchema = new Schema({
    titre : String,
        cin : Number,
        description: String,
    },
    {
        versionKey: false
    });

module.exports = mongoose.model('Reclamations', reclamationSchema, 'Reclamations');

