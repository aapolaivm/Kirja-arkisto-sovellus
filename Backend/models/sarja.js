const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sarjaSchema = new Schema({
    nimi: {type: String, required: true},
    ekavuosi: {type: Number, required: false},
    vikavuosi: {type: Number, required: false},
    kuvaus: {type: String, required: false},
    _id: {type:mongoose.Types.ObjectId}
})

module.exports = {
    Sarja:mongoose.model('Sarja', sarjaSchema)
}