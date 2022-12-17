const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SumSchema = new Schema({
    pricetobereimbursed : Number,
    id_bulletin : String

    },
    {
        versionKey: false
    });

// Export the model
module.exports = mongoose.model('Sum', SumSchema, 'Sum');
