const express = require("express");
const HttpError = require("../models/http-error")
const loginControllers = require("../controllers/login-controllers")

const router = express.Router();

router.post("/",loginControllers.verifyKayttaja)

module.exports=router;