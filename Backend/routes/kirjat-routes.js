const { json } = require('body-parser');
const express = require('express');
const HttpError = require('../models/http-error')
const kirjatControllers = require('../controllers/kirjat-controllers')

//Luodaan tänne reititys kirjat resurssille

const router = express.Router();


router.get('/', kirjatControllers.getAllKirjat);

router.get('/:_id', kirjatControllers.getKirjaById);

router.post('/', kirjatControllers.createKirja);

router.patch('/:_id', kirjatControllers.updateKirjabyId);

router.delete('/:_id', kirjatControllers.deleteKirjaById);

module.exports = router;