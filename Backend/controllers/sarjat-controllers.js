const HttpError = require('../models/http-error');
const {Sarja} = require('../models/sarja');
const {SarjanKirja} = require('../models/sarja');

const mongoose = require('mongoose');


const createSarja = async (req, res, next) => {
    const {nimi, ekavuosi, vikavuosi, kuvaus} = req.body; 
    const newid = new mongoose.Types.ObjectId().toHexString();
    const createdSarja = new Sarja({
        nimi: nimi,
        ekavuosi: ekavuosi,
        vikavuosi: vikavuosi,
        kuvaus: kuvaus,
        _id: newid,
        kirjat: []
    });
    try {
        await createdSarja.save();
    } catch (err) {
        const error = new HttpError(
            'Sarjan luonti epäonnistui, kokeile uudelleen!',
            500
        );
        console.log(err)
        return next(error);
    }
    res
    .status(201)
    .json(createdSarja);
};

const getAllSarjat = async (req, res, next) => {
    let sarjat;
    try {
        sarjat = await Sarja.find().lean();
    } catch (err) {
        const error = new HttpError(
            'Jokin meni vikaan, sarjoja ei onnistuttu saamaan', 500
        );
        return next(error);
    }
    if (!sarjat || sarjat.lenght == 0)  {
        const error = new HttpError(
            'Sarjoja ei löytynyt', 404
        );
        return next(error);
    }
    sarjat = sarjat.map(sarja => {
        return {...sarja
            
        }
    })
    res.json(sarjat);
};


const getSarjaById = async (req, res, next) => {
    const sarjaId = req.params._id;
    let sarja;
    try {
        sarja = await Sarja.findById(sarjaId);
    } catch (err) {
        const error = new HttpError(
            'Jokin meni vikaan, sarjoja ei onnistuttu saamaan', 500

        );
        return next(error);
    }
    if (!sarja) {
        const error = new HttpError(
            'Sarjaa ei löytynyt kyseisellä id:llä', 404
        );
        return next(error);
    }
    res.json({sarja: sarja.toObject()});
;}

const addKirjaSarjaan = async (req, res, next) => {
    const {_id} = req.body;
    try {
        const kirja = new SarjanKirja({_id})
        await kirja.save()
        const sarja = await Sarja.findByIdAndUpdate(
            _id,
            {$push: {kirjat: kirja._id}},
            {new: true}

        ).populate('kirjat')
    } catch (err) {
        const error = new HttpError(
            'Sarjan luonti epäonnistui, kokeile uudelleen!',
            500
        );
        console.log(err)
        return next(error);
    }
}

exports.createSarja = createSarja;
exports.getAllSarjat = getAllSarjat;
exports.getSarjaById = getSarjaById;
exports.addKirjaSarjaan = addKirjaSarjaan;

