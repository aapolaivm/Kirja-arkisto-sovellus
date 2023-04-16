const mongoose = require('mongoose');
const { kuvaSchema } = require('./kuva');

const Schema = mongoose.Schema;

const nideSchema = new Schema({
    kunto: {type: String, required: true},
    hankintahinta: {type: Number, required: true},
    etukansikuva: {type: Schema.Types.ObjectId, ref:'Kuva'},
    takakansikuva: {type: Schema.Types.ObjectId, ref:'Kuva'},
    muutkuvat: [{type: Schema.Types.ObjectId, ref:'Kuva'}]
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
    kustantaja: {type: String, required: false},
    _id: {type:mongoose.Types.ObjectId}
})

kategoriaSchema.statics.findOneAndCreate = function
findOneAndCreate(condition, doc){
    const self = this;
    const newDocument = doc;
    return new Promise((resolve, reject) => {
        return self.findOne(condition)
        .then((result) => {
            if (result) {
                return resolve(result);
            }
                return self.create(newDocument)
            .then((result) => {
                return resolve(result);
            }).catch((error) => {
                return reject(error);
            })
        }).catch((error) => {
            return reject(error);
        })
    });   
}

// module.exports = mongoose.model('Kirja', kirjaSchema);
// module.exports = mongoose.model('Kategoria', kategoriaSchema);
// module.exports = mongoose.model('Nide', nideSchema);
module.exports = {
    Kirja:mongoose.model('Kirja', kirjaSchema),
    Kategoria:mongoose.model('Kategoria', kategoriaSchema),
    Nide:mongoose.model('Nide', nideSchema)
}

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