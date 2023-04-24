const express = require("express");
const HttpError = require("../models/http-error")
const registerControllers = require("../controllers/register-controllers")

const router = express.Router();

router.get("/", registerControllers.getKayttajat);

router.post("/", registerControllers.createKayttaja);

router.delete("/",registerControllers.deleteKayttajat);

module.exports = router;