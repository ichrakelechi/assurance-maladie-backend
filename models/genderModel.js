const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let GenderSchema = new Schema({
        name: String,
        description: String
    },
    {
        versionKey: false
    });

// Export the model
module.exports = mongoose.model('Gender', GenderSchema, 'Gender');
