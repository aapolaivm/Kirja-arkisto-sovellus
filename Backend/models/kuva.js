const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const kuvaSchema = new Schema({
    nimi: {type: String, required: true},
    data: {type: Buffer, required: true},
    mimetype: {type: String, required: true}
})
module.exports = {
    Kuva: mongoose.model('Kuva', kuvaSchema),
    kuvaSchema
}