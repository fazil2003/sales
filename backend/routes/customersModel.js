const mongoose = require("mongoose");
const db = require("./connect-db");

// create an schema
var customersSchema = new mongoose.Schema({
        name: String,
        occupation: String,
        address: String,
        phone: String,
        email: String
    });

var customersModel = mongoose.model('customers', customersSchema);
// module.exports = mongoose.model("Products", productsModel);
module.exports = customersModel;