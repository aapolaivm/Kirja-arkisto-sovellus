const mongoose = require("mongoose");

const kayttajaSchema = new mongoose.Schema(

    {
        username:{
            type:String,
            required: true
        },

        password:{
            type:String,
            required: true

        },
        sarjat:[
            {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Sarja",
            }   
        ],

        _id: {type:mongoose.Types.ObjectId}    
    }
);


const Kayttaja = mongoose.model("Kayttaja", kayttajaSchema);

module.exports = Kayttaja;