const HttpError = require('../models/http-error');
const Kirja = require('../models/kirja');
const mongoose = require('mongoose');

const createKirja = async (req, res, next) => {
    const {nimi, kirjailija, julkaisuvuosi, kuvausteksti} = req.body;
    const newid = new mongoose.Types.ObjectId().toHexString();
    const createdKirja = new Kirja({
        nimi: nimi,
        kirjailija: kirjailija,
        julkaisuvuosi: julkaisuvuosi,
        kuvausteksti: kuvausteksti,
        _id: newid
    });
    try {
        await createdKirja.save();
    } catch (err) {
        const error = new HttpError(
            'Kirjan luonti epäonnistui, kokeile uudelleen!',
            500
        );
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
        kirjat = await Kirja.find();
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
    res.json(kirjat);
};


const getKirjaById = async (req, res, next) => {
    const kirjaId = req.params._id;
    let kirja;
    try {
        kirja = await Kirja.findById(kirjaId);
    } catch (err) {
        const error = HttpError(
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


exports.createKirja = createKirja;
exports.updateKirjabyId = updateKirjabyId;
exports.deleteKirjaById = deleteKirjaById;
exports.getAllKirjat = getAllKirjat;
exports.getKirjaById = getKirjaById;

