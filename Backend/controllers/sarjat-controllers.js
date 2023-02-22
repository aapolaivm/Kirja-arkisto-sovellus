const HttpError = require('../models/http-error')


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

exports.getAllsarjat = getAllsarjat;
exports.getSarjaById = getSarjaById;