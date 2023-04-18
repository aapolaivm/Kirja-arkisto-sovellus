const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sarjanKirjaSchema = new Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, ref: 'Sarja' }
})

const sarjaSchema = new Schema({
    nimi: {type: String, required: true},
    ekavuosi: {type: Number, required: false},
    vikavuosi: {type: Number, required: false},
    kuvaus: {type: String, required: false},
    _id: {type:mongoose.Types.ObjectId},
    kirjat: [sarjanKirjaSchema]
})

module.exports = {
    Sarja:mongoose.model('Sarja', sarjaSchema),
    SarjanKirja:mongoose.model('SarjanKirja', sarjanKirjaSchema)
}