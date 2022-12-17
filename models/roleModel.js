const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//dima fassa5 el kelma eli 9bal shema w ekteb'ha minus : sexeSchema >>> roleSchema
let roleSchema = new Schema({
        name: String,
        description: String
    },
    {
        //houni zeda win nzidou date systeme
        versionKey: false
        // ken el "versionKey: false" >>> mayetzedech el champ 
        // ken el "versionKey: true" >>> _V : 0/1
    });

// Export the model
module.exports = mongoose.model('Role', roleSchema, 'Role');
//fel base el esm yebda bel majus 
