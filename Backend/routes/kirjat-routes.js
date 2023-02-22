const express = require('express');

//Luodaan tänne reititys kijat resurssille

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('GET request in kirjat');
    res.json({message: 'GET toimii'})
})

module.exports = router;