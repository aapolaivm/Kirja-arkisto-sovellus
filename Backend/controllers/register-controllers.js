const HttpError = require("../models/http-error");
const Kayttaja = require("../models/kayttaja");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtoken = require("jsonwebtoken");



const getKayttajat = async (req, res, next) =>{
    let kayttajat;
    try{
        kayttajat = await Kayttaja.find();
    }
    catch(err){
        const error = new HttpError(
            "Käyttäjien haku epäonnistui",500
        );
        return next(error);
    }
    res
    .json(kayttajat);
}

const createKayttaja = async (req,res,next) =>{

    const user = req.body;
    const newid = new mongoose.Types.ObjectId().toHexString();
    const kayttaja = await Kayttaja.findById(user.userId);

    try{
        const alreadyExist = await Kayttaja.findOne({username:user.username});
        if(alreadyExist){
            return res.status(500).json({message:"kayttajanimi on jo käytössä"});
        }
        user.password = user.password; //bcrypt.hash(req.body.password, 10)
        const createdKayttaja = new Kayttaja({username:user.username,password:user.password, _id:newid})
    
        await createdKayttaja.save();
    }
    catch(err){
        const error = new HttpError(
            'Käyttäjän luonti epäonnistui',
            500
        );
        console.log(err)
        return next(error);
    }
    res
    .status(201)
    .json(createKayttaja);
}

const deleteKayttajat = async (req,res,next) =>{

const kayttaja = req.Kayttaja;


    try{
        console.log(kayttaja)
        await Kayttaja.deleteMany({kayttaja});
        
        res.json({message:"kayttjat poistettu onnistuneesti"});
    }
    catch(err){
        const error = new HttpError("käyttäjien poisto epäonnistui");
        console.log(err);
        return next(error);
    }
}

exports.getKayttajat = getKayttajat;
exports.createKayttaja = createKayttaja;
exports.deleteKayttajat = deleteKayttajat;