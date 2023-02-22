const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const kirjaSchema = new Schema({
    nimi: {type: String, required: true},
    kirjailija: {type: String, required: true},
    julkaisuvuosi: {type: Date, required: true},
    kuvausteksti: {type: String, required: false},
    _id: {type:mongoose.Types.ObjectId}
})

module.exports = mongoose.model('Kirja', kirjaSchema);

/*
    sarja: {type: Number, required: false},    
    jarjestysnumero: {type: Number, required: false},    

    kirjasarja: {type: String, required: true},

    etukansikuva: {type: String, required: true},
    takakansikuva: {type: String, required: true},
    lisakuvat: {type: String, required: true},
    piirtäjät: {type: String, required: true},


    painokset: {type: String, required: true},


    kuntoluokka: {type: String, required: true},
    hankintahinta: {type: String, required: true},
    hankintaAika: {type: String, required: true}

*/