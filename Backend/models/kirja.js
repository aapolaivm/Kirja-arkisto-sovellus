const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const nideSchema = new Schema({
    kunto: {type: String, required: true},
    hankintahinta: {type: Number, required: true},
    kansikuva: {type: String, required: false},
    takakansikuva: {type: String, required: false}
})
const kategoriaSchema = new Schema({
    nimi: {type: String, required: true}
})

const kirjaSchema = new Schema({
    nimi: {type: String, required: true},
    kirjailija: {type: String, required: true},
    julkaisuvuosi: {type: Date, required: true},
    kuvausteksti: {type: String, required: false},
    niteet: [nideSchema],
    kategoria: [kategoriaSchema],
    _id: {type:mongoose.Types.ObjectId}
})

module.exports = mongoose.model('Kirja', kirjaSchema);
module.exports = mongoose.model('Kategoria', kategoriaSchema);
module.exports = mongoose.model('Nide', nideSchema);

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