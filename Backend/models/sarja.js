const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sarjanKirjaSchema = new Schema({
    nimi: {type: String, required: true},
    jarjestysnumero: {type: Number, required: false},
    kuvausteksti: {type: String, required: false},
    kirjailija: {type: String, required: false},
    piirtajat: {type: String, required: false},
    ensipainosvuosi: {type: Number, required: false},
    painos: {type: String, required: false},
    kuntoluokka: {type: String, required: false},
    hankintahinta: {type: Number, required: false},
    hankintapvm: {type: Date, required: false},
    etukansikuva: {type: Schema.Types.ObjectId, ref:'Kuva'},
    takakansikuva: {type: Schema.Types.ObjectId, ref:'Kuva'},
    muutkuvat: [{type: Schema.Types.ObjectId, ref:'Kuva'}],
    sarja:{type: mongoose.Schema.Types.ObjectId, ref:'Sarja'},
    _id: {type: mongoose.Schema.Types.ObjectId}
})

const sarjaSchema = new Schema({
    nimi: {type: String, required: true},
    ekavuosi: {type: Number, required: false},
    vikavuosi: {type: Number, required: false},
    kuvaus: {type: String, required: false},
    _id: {type:mongoose.Types.ObjectId},
    //kirjat: [{type: Schema.Types.ObjectId, ref:'Sarjankirja'}]
})

module.exports = {
    Sarja:mongoose.model('Sarja', sarjaSchema),
    SarjanKirja:mongoose.model('SarjanKirja', sarjanKirjaSchema)
}