const express = require('express');
const bodyParser  = require('body-parser');
const mongoose = require('mongoose');

const kirjatRoutes = require('./routes/kirjat-routes');
const sarjatRoutes = require('./routes/sarjat-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});


//Midlleware
app.use('/api/kirjat',kirjatRoutes);
app.use('/api/sarjat',sarjatRoutes);

app.use((req, res, next) => {
    const error = new HttpError('Ei löytynyt routtia');
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message:error.message || 'Unknown error'});
});

//Kannan yhdistäminen 
mongoose
    .connect('mongodb+srv://mongouser:Bb0yrh1lrmkfBfNq@cluster0.tgxjloc.mongodb.net/KirjaDB?retryWrites=true&w=majority')
    .then(() => {
        app.listen(5000);
    })
    .catch(err => {
        console.log(err)
    });


