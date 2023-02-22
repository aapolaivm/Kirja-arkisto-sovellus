const express = require('express');
const bodyParser  = require('body-parser');

const kirjatRoutes = require('./routes/kirjat-routes');
const sarjatRoutes = require('./routes/sarjat-routes');


const app = express();

//Midlleware
app.use('/api/kirjat',kirjatRoutes);
app.use('/api/sarjat',sarjatRoutes);
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message:error.message || 'Unknown error'});
});

//kuuntelu
app.listen(5000);