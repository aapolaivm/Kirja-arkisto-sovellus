const { json } = require('body-parser');
const express = require('express');
const multer = require('multer');
const uuid = require('uuid');
const HttpError = require('../models/http-error')
const kirjatControllers = require('../controllers/kirjat-controllers');
const { Kuva } = require('../models/kuva');
//Luodaan tänne reititys kirjat resurssille



const upload = multer({storage: multer.memoryStorage()})
const router = express.Router();
const kuvatupload = upload.fields([{name: 'etukansikuva', maxCount: 1}, {name: 'takakansikuva', maxCount: 1}, {name: 'muutkuvat', maxCount: 4}])
// router.post('/kuva', kuvatupload, function(req, res, next){
//     console.log(req.files['etukansikuva'][0])
// })
router.post('/kuva', upload.array('kuva', 4), async function(req, res, next){
    // req.file on kuva
    console.log(req.files)
    const kuva = new Kuva({
        nimi: uuid.v4(),
        data: req.file.buffer,
        mimetype: req.file.mimetype
    })
    await kuva.save()
    res.status(200)
})
router.get('/kuva/:nimi', async function (req, res, next){
    const kuva = await Kuva.findOne({nimi: req.params.nimi})
    console.log(kuva)
    res.contentType(kuva.mimetype)
    res.send(Buffer.from(kuva.data, 'base64' ))
})


router.get('/kategoria', kirjatControllers.getKategoriat)

router.get('/', kirjatControllers.getAllKirjat);

router.get('/:_id', kirjatControllers.getKirjaById);

router.post('/', kuvatupload, kirjatControllers.createKirja);

router.patch('/:_id', kirjatControllers.updateKirjabyId);

router.delete('/:_id', kirjatControllers.deleteKirjaById);


module.exports = router;