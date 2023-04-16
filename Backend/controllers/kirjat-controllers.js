const HttpError = require('../models/http-error');
const {Kirja} = require('../models/kirja');
const {Nide} = require('../models/kirja');
const {Kategoria} = require('../models/kirja');
const mongoose = require('mongoose');
var moment = require('moment'); // require
const uuid = require('uuid');
const { Kuva } = require('../models/kuva');

async function createKuva(file){
    try {
        const kuva = new Kuva({
            nimi: uuid.v4(),
            data: file.buffer,
            mimetype: file.mimetype
        }) 
        await kuva.save()
        return kuva
    } catch (error) {
        console.error(error)
        return null
    }
    
}

const createKirja = async (req, res, next) => {
    // req.files['etukansikuva'][0]
    // req.files['takakansikuva'][0]
    // req.files['muutkuvat']
    const {nimi, kirjailija, julkaisuvuosi, kuvausteksti, kunto, hankintahinta,
    kategoria, kustantaja} = req.body;
    // const kirjatkategoria = await Kategoria.findOneAndCreate({nimi:kategoria}, {nimi:kategoria})
    const newid = new mongoose.Types.ObjectId().toHexString();
    const createdKirja = new Kirja({
        nimi: nimi,
        kirjailija: kirjailija,
        julkaisuvuosi: julkaisuvuosi,
        kuvausteksti: kuvausteksti,
        // kategoria: [kirjatkategoria],
        kustantaja: kustantaja,
        _id: newid
    });

    const kategoriat = kategoria.split('|').map(nimi => {
        return Kategoria.findOneAndCreate({nimi}, {nimi})
    })
    createdKirja.kategoria = await Promise.all(kategoriat)

    const createdNide = new Nide({kunto, hankintahinta})
    createdKirja.niteet = [createdNide]
    if (req.files['etukansikuva']){
        const etukansikuva = await createKuva(req.files['etukansikuva'][0])
        createdNide.etukansikuva = etukansikuva
    }
    if (req.files['takakansikuva']){
        const takakansikuva = await createKuva(req.files['takakansikuva'][0])
        createdNide.takakansikuva = takakansikuva
    }
    if (req.files['muutkuvat']){
        // array of promises
        const muutkuvat = req.files['muutkuvat'].map(kuva => createKuva(kuva))
        createdNide.muutkuvat = await Promise.all(muutkuvat)
    }
    try {
        await createdNide.save();
        await createdKirja.save();
        console.log(createdNide.etukansikuva)
    } catch (err) {
        const error = new HttpError(
            'Kirjan luonti epäonnistui, kokeile uudelleen!',
            500
        );
        console.log(err)
        return next(error);
    }
    res
    .status(201)
    .json(createdKirja);
};

const updateKirjabyId = async (req, res, next) => {
    const {nimi, kirjailija, julkaisuvuosi, kuvausteksti} = req.body;
    const kirjaId = req.params._id;
    let kirja;
    try { 
        kirja = await Kirja.findById(kirjaId);
    } catch (err) {
        const error = HttpError(
            'Kirja jonka id on '+kirjaId+' ei löytynyt',500

        );
        return next(error);
    }
    if (kirja) {
        kirja.nimi = nimi;
        kirja.kirjailija = kirjailija;
        kirja.julkaisuvuosi = julkaisuvuosi;
        kirja.kuvausteksti = kuvausteksti;
        kirja.id =  kirjaId;
        try {
            await kirja.save();
        } catch (err) {
            const error = new HttpError(
                'tietojen päivitys epäonnistui',500
            );
            return next(error);
        }
    } else {
        const error = new HttpError(
            'Kirjaa ei löytynyt', 404
        );
        return next(error);
    }
    res.json({kirja: kirja.toObject({getters: true})});
};

const deleteKirjaById = async (req, res, next) => {
    const kirjaId = req.params._id;
    let kirja;
    try {
        kirja = await Kirja.findById(kirjaId);
    } catch (err) {
        const error = new HttpError(
            'Kirjan poistaminen epäonnistui', 500
        );
        return next(error);
    }
    if (kirja) {
        try {
            await kirja.remove();
        } catch (err) {
            const error = new HttpError(
                'Kirjan poistaminen epänonnistui', 500
            );
            return next(error);
        }
    } else {
        const error = new HttpError(
            'Kirjaa ei löytynyt', 404
        );
        return next(error);
    }
    res
    .status(200)
    .json({message:'Kirja poistettu'});
};

const getAllKirjat = async (req, res, next) => {
    let kirjat;
    try {
        kirjat = await Kirja.find().lean();
    } catch (err) {
        const error = new HttpError(
            'Jokin meni vikaan, kirjoja ei onnistuttu saamaan', 500
        );
        return next(error);
    }
    if (!kirjat || kirjat.lenght == 0)  {
        const error = new HttpError(
            'Kirjoja ei löytynyt', 404
        );
        return next(error);
    }
    kirjat = kirjat.map(kirja => {
        return {...kirja, 
            julkaisuvuosi: moment(kirja.julkaisuvuosi).format("YYYY"),
            kategoria: kirja?.kategoria?.map(k => k.nimi).join(', ')??''
        }
    })
    res.json(kirjat);
};


const getKirjaById = async (req, res, next) => {
    const kirjaId = req.params._id;
    let kirja;
    try {
        kirja = await Kirja.findById(kirjaId);
    } catch (err) {
        const error = new HttpError(
            'Jokin meni vikaan, kirjoja ei onnistuttu saamaan', 500

        );
        return next(error);
    }
    if (!kirja) {
        const error = new HttpError(
            'Kirjaa ei löytynyt kyseisellä id:llä', 404
        );
        return next(error);
    }
    res.json({kirja: kirja.toObject()});
;}
const getKategoriat = async (req, res, next) => {
    const kategoriat = await Kategoria.find({}).lean()
    res.json({kategoriat})
}


exports.createKirja = createKirja;
exports.updateKirjabyId = updateKirjabyId;
exports.deleteKirjaById = deleteKirjaById;
exports.getAllKirjat = getAllKirjat;
exports.getKirjaById = getKirjaById;
exports.getKategoriat = getKategoriat;

