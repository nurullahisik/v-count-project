const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CountriesSchema = new Schema({
    name: String,
    region: String
});

module.exports = mongoose.model('Countries', CountriesSchema);
