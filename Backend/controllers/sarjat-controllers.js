const HttpError = require('../models/http-error');
const { Sarja } = require('../models/sarja');
const { SarjanKirja } = require('../models/sarja');
const { Kuva } = require('../models/kuva');

const mongoose = require('mongoose');
var moment = require('moment'); // require
const uuid = require('uuid');

const createSarja = async (req, res, next) => {
    const { nimi, ekavuosi, vikavuosi, kuvaus } = req.body;
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

const createKirjaSarjaan = async (req, res, next) => {
    const { nimi, jarjestysnumero, kuvausteksti, kirjailija, piirtajat, ensipainosvuosi,
        painos, kuntoluokka, hankintahinta, hankintapvm } = req.body;
    const newid = new mongoose.Types.ObjectId().toHexString();
    const createdKirja = new SarjanKirja({
        nimi: nimi,
        jarjestysnumero: jarjestysnumero,
        kuvausteksti: kuvausteksti,
        kirjailija: kirjailija,
        piirtajat: piirtajat,
        ensipainosvuosi: ensipainosvuosi,
        painos: painos,
        kuntoluokka: kuntoluokka,
        hankintahinta: hankintahinta,
        hankintapvm: hankintapvm,
        _id: newid
    });
    /*
    if (req.files['etukansikuva']) {
        const etukansikuva = await createKuva(req.files['etukansikuva'][0])
        createdKirja.etukansikuva = etukansikuva
    }
    if (req.files['takakansikuva']) {
        const takakansikuva = await createKuva(req.files['takakansikuva'][0])
        createdKirja.takakansikuva = takakansikuva
    }
    if (req.files['muutkuvat']) {
        // array of promises
        const muutkuvat = req.files['muutkuvat'].map(kuva => createKuva(kuva))
        createdKirja.muutkuvat = await Promise.all(muutkuvat)
    }
    */
    try {
        await createdKirja.save();
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
}

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
    if (!sarjat || sarjat.lenght == 0) {
        const error = new HttpError(
            'Sarjoja ei löytynyt', 404
        );
        return next(error);
    }
    sarjat = sarjat.map(sarja => {
        return {
            ...sarja

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
    res.json({ sarja: sarja.toObject() });
    ;
}

const deleteSarjaById = async (req, res, next) => {
    try {
        const poistettuSarja = await Sarja.findOneAndDelete({ _id: req.params._id });
        if (!poistettuSarja) {
            return res.status(404).json({ message: 'Series not found' });
        }
        res.status(200).json({ message: 'Series deleted from series successfully', poistettuSarja });

    } catch (err) {
        // Return an error response if something goes wrong
        res.status(500).json({ error: err.message });
    }
}

const updateSarjaById = async (req, res) => {
    const { nimi, ekavuosi, vikavuosi, kuvaus } = req.body;
    const { _id } = req.params;
    try {
        const sarja = await Sarja.findById(_id);

        if (!sarja) {
            return res.status(404).json({ msg: 'Sarjaa ei löytynyt' });
        }
        sarja.nimi = nimi;
        sarja.ekavuosi = ekavuosi;
        sarja.vikavuosi = vikavuosi;
        sarja.kuvaus = kuvaus;
        await sarja.save();
        res.json({ msg: 'Sarjan tiedot päivitetty' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Serverivirhe');
    }
}

//Sarjojen kirjojen controllerit

async function createKuva(file) {
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

const addKirjaSarjaan = async (req, res, next) => {
    try {
        const sarja = await Sarja.findOne({ _id: req.params._id });
        if (!sarja) {
            return res.status(404).json({ message: 'Sarjaa ei löytynyt' })
        }
        //const { nimi, jarjestysnumero, kuvausteksti, kirjailija, piirtajat, ensipainosvuosi,
        //    painos, kuntoluokka, hankintahinta, hankintapvm } = req.body;
        const newid = new mongoose.Types.ObjectId().toHexString();
        const kirja = new SarjanKirja({
            nimi: req.body.nimi,
            jarjestysnumero: req.body.jarjestysnumero,
            kuvausteksti: req.body.kuvausteksti,
            kirjailija: req.body.kirjailija,
            piirtajat: req.body.piirtajat,
            ensipainosvuosi: req.body.ensipainosvuosi,
            painos: req.body.painos,
            kuntoluokka: req.body.kuntoluokka,
            hankintahinta: req.body.hankintahinta,
            hankintapvm: req.body.hankintapvm,
            sarja: sarja._id,
            _id: newid
        });
        /*
        if (req.files['etukansikuva']) {
            const etukansikuva = await createKuva(req.files['etukansikuva'][0])
            kirja.etukansikuva = etukansikuva
        }
        if (req.files['takakansikuva']) {
            const takakansikuva = await createKuva(req.files['takakansikuva'][0])
            kirja.takakansikuva = takakansikuva
        }
        if (req.files['muutkuvat']) {
            // array of promises
            const muutkuvat = req.files['muutkuvat'].map(kuva => createKuva(kuva))
            kirja.muutkuvat = await Promise.all(muutkuvat)
        }
        */
        await kirja.save();
        res.status(200).json({ message: 'Book added to series successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getSarjanKirjat = async (req, res, next) => {
    try {
        const kirjat = await SarjanKirja.find({ sarja: req.params._id })
        const formattedKirjat = kirjat.map(kirja => {
            return {
                ...kirja.toObject(),
                hankintapvm: moment(kirja.hankintapvm).format('DD.MM.YYYY')
            }
        });
        res.status(200).json({ kirjat: formattedKirjat });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
}

const getSarjanKirjatById = async (req, res, next) => {
    try {
        const sarjanKirja = await SarjanKirja.findById(req.params._id);
        if (!sarjanKirja) {
            return res.status(404).json({ message: 'Book not found' });
        }
        //console.log(sarjanKirja.hankintapvm); // log the original value
        //sarjanKirja.hankintapvm = moment(sarjanKirja.hankintapvm, "YYYY-MM-DD").format('DD.MM.YYYY');
        //console.log(sarjanKirja.hankintapvm); // log the transformed value
        res.json({ sarjanKirja });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


const deleteSarjanKirjaById = async (req, res, next) => {
    try {
        const poistettuKirja = await SarjanKirja.findOneAndDelete({ _id: req.params._id });
        if (!poistettuKirja) {
            // Return an error response if the book was not found
            return res.status(404).json({ message: 'Book not found in series' });
        }
        res.status(200).json({ message: 'Book deleted from series successfully', poistettuKirja });

    } catch (err) {
        // Return an error response if something goes wrong
        res.status(500).json({ error: err.message });
    }
}

const updateSarjanKirjaById = async (req, res, next) => {
    const { nimi, jarjestysnumero, ensipainosvuosi, kuvausteksti, kirjailija, piirtajat, painos,
        kuntoluokka, hankintahinta, hankintapvm } = req.body;
    const { _id } = req.params;
    try {
        const kirja = await SarjanKirja.findById(_id);

        if (!kirja) {
            return res.status(404).json({ msg: 'Kirjaa ei löytynyt' });
        }
        kirja.nimi = nimi,
            kirja.jarjestysnumero = jarjestysnumero,
            kirja.ensipainosvuosi = ensipainosvuosi,
            kirja.kuvausteksti = kuvausteksti,
            kirja.kirjailija = kirjailija,
            kirja.piirtajat = piirtajat,
            kirja.painos = painos,
            kirja.kuntoluokka = kuntoluokka,
            kirja.hankintahinta = hankintahinta,
            kirja.hankintapvm = hankintapvm
        await kirja.save();
        res.json({ msg: 'Kirjan tiedot päivitetty' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Serverivirhe');
    }
}


//sarjan jutut
exports.createSarja = createSarja;
exports.getAllSarjat = getAllSarjat;
exports.getSarjaById = getSarjaById;
exports.deleteSarjaById = deleteSarjaById;
exports.updateSarjaById = updateSarjaById;

//sarjanKirjan jutut
exports.addKirjaSarjaan = addKirjaSarjaan;
exports.getSarjanKirjat = getSarjanKirjat;
exports.getSarjanKirjatById = getSarjanKirjatById;
exports.deleteSarjanKirjaById = deleteSarjanKirjaById;
exports.updateSarjanKirjaById = updateSarjanKirjaById;





