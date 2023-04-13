const HttpError = require('../models/http-error');
const {Sarja} = require('../models/sarja');

const mongoose = require('mongoose');


const createSarja = async (req, res, next) => {
    const {nimi, ekavuosi, vikavuosi, kuvaus,} = req.body;
    const newid = new mongoose.Types.ObjectId().toHexString();
    const createdSarja = new Sarja({
        nimi: nimi,
        ekavuosi: ekavuosi,
        vikavuosi: vikavuosi,
        kuvaus: kuvaus,
        _id: newid
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

/*
const getAllsarjat = async (req, res, next) => {
    let sarjat;
    try {
        sarjat = await Sarjat.find();
    } catch (err) {
        
    }
    console.log('GET request in sarjat');
    res.json(TESTISARJAT);
}

const getSarjaById = (req, res, next) => {
    const sarjaid = parseInt(req.params.id);
    const sarja = TESTISARJAT.find(p => {
        return p.id === sarjaid;
    });
    if (!sarja) {
        return next(new HttpError('Sarjaa ei löytynyt', 404));
    }
    res.json({ sarja })
}
*/
exports.createSarja = createSarja;
exports.getAllSarjat = getAllSarjat;
//exports.getSarjaById = getSarjaById;

/*
const TESTISARJAT = [
    {
        "id": 1,
        "lisäyspäivä": "2023-01-01",
        "client": "Pekka",
        "sarjaname": "Asterix",
        "pcs": 1
    },
    {
        "id": 2,
        "lisäyspäivä": "2023-02-01",
        "client": "Ulla",
        "sarjaname": "Tintti",
        "pcs": 2
    },
    {
        "id": 3,
        "lisäyspäivä": "2023-02-22",
        "client": "Paivi",
        "sarjaname": "Aku Ankka",
        "pcs": 89
    }
]
*/