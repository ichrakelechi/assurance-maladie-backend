const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ConsultationSchema = new Schema({
    dateConsultation: Date,
    doctorName: String,
    code: String,
    amount: Number,
    id_bulletin: String
}, {
    versionKey: false
});

// Export the model
module.exports = mongoose.model('Consultation', ConsultationSchema, 'Consultation');
