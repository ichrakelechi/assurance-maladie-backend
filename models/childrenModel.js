const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ChildrenSchema = new Schema({
        firstName: String,
        lastName : String,
        dateNaissance : Date,
        observation: String,
        id_u: Number
    },
    {
        versionKey: false
    });

// Export the model
module.exports = mongoose.model('Children', ChildrenSchema, 'Children');