const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BulletinSchema = new Schema({
        id_bulletin: String,
        id_u: Number,   //id_user
        claimNumber: Number,
        dateBulettin: Date,
        companyName: String,
        firstName: String,
        lastName : String,
        adress: String,
        Proffesion : String, 
        sick : String, // adherant , conjoint , enfant 
        sickFirstName : String , 
        sickLastName : String ,
        cinSick : Number, // cin mta3 lmridh
        
    },
    {
        versionKey: false
    });

// Export the model
module.exports = mongoose.model('Bulletin', BulletinSchema, 'Bulletin');
