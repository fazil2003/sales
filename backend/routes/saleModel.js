const mongoose = require("mongoose");
const db = require("./connect-db");

// create an schema
var salesSchema = new mongoose.Schema({
        customer: String,
        product: String,
        price: Number
    });

var salesModel = mongoose.model('sales', salesSchema);
module.exports = salesModel;