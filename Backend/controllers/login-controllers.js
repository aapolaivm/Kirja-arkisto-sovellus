const HttpError = require("../models/http-error");
const Kayttaja = require("../models/kayttaja");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtoken = require("jsonwebtoken");
const { json } = require("body-parser");


const verifyKayttaja = async(req,res,next)=>{
    
    const username = req.body.username;
    const password = req.body.password;

    try{
        const data = await Kayttaja.findOne({username, password})
        if(data){
            console.log(data);
            res.send("onnistui");
            
        }
        else{
            res.send("väärä käyttäjätunnus tai salasana");
            console.log(data);
        }

    }
    catch(err){
        console.log(err)
    }
    
    
}

exports.verifyKayttaja = verifyKayttaja;