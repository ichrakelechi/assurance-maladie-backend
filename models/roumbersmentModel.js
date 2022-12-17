const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RemboursementSchema = new Schema({
    code: Number,
    amount: Number,
    remprice:Number,
    id_bulletin: String
}, {
    versionKey: false
});

// Export the model
module.exports = mongoose.model('Remboursement', RemboursementSchema, 'Remboursement');
