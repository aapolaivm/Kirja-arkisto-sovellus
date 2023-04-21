const { json } = require('body-parser');
const express = require('express');
const multer = require('multer');
const uuid = require('uuid');
const HttpError = require('../models/http-error')
const sarjatControllers = require('../controllers/sarjat-controllers')
const { Kuva } = require('../models/kuva');


//Luodaan tänne reititys sarjat resurssille
const upload = multer({storage: multer.memoryStorage()})
const router = express.Router();
const kuvatupload = upload.fields([{name: 'etukansikuva', maxCount: 1}, {name: 'takakansikuva', maxCount: 1}, {name: 'muutkuvat', maxCount: 4}])

router.get('/kuva/:nimi', async function (req, res, next){
    const kuva = await Kuva.findOne({nimi: req.params.nimi}) 
    if (!kuva){
        return res.status(404)
    }   
    res.contentType(kuva.mimetype)
    res.send(Buffer.from(kuva.data, 'base64' ))
})

// Sarjojen routit
router.post('/', sarjatControllers.createSarja);
router.get('/', sarjatControllers.getAllSarjat);
router.get('/:_id', sarjatControllers.getSarjaById);
router.put('/:_id', sarjatControllers.updateSarjaById);
router.delete('/:_id', sarjatControllers.deleteSarjaById);

//SarjojenKirjojen rourit
router.post('/:_id/kirjat', kuvatupload, sarjatControllers.addKirjaSarjaan);
router.get('/:_id/kirjat', sarjatControllers.getSarjanKirjat);
router.get('/:_id/kirjat/:_id', sarjatControllers.getSarjanKirjatById);
router.delete('/:_id/kirjat/:_id', sarjatControllers.deleteSarjanKirjaById);
router.put('/:_id/kirjat/:_id', sarjatControllers.updateSarjanKirjaById);


module.exports = router;