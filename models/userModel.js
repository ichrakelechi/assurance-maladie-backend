const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
        cin: Number,
        firstName: String,
        lastName: String,
        dateDeNaissance: Date,
        gender: String,
        adress: String,
        mobile: Number,
        password: String,
        email: String,
        profession : String,
        campanyName : String,
        dateDentreTravail: Date,
        Salary : Number,
        conjoint : String , /// filiere 
        familySituation : String ,
        weddingDate : Date, // date 3ershom
        conjointPlan : String , // regime de conjoint
        professionConjoint : String , /// filiere de proffesion 
        id_conjoint : Number,
        affiliateNumber : Number,
        active: Boolean,
        role: String,
        beneficiaire: String,
        lieuDeParente: String,
    },
    {
        versionKey: false,
        timestamps: true
    });

// Export the model
module.exports = mongoose.model('User', UserSchema, 'User');
