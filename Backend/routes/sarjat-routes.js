const { json } = require('body-parser');
const express = require('express');
const HttpError = require('../models/http-error')
const sarjatControllers = require('../controllers/sarjat-controllers')

//Luodaan tänne reititys sarjat resurssille

const router = express.Router();

router.post('/', sarjatControllers.createSarja);

router.get('/', sarjatControllers.getAllSarjat);

//router.get('/:id', sarjatControllers.getSarjaById);


module.exports = router;