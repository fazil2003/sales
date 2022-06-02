const mongoose = require("mongoose");
const db = require("./connect-db");

// create an schema
var productsSchema = new mongoose.Schema({
        name: String,
        email:String
    });

var productsModel = mongoose.model('products', productsSchema);
// module.exports = mongoose.model("Products", productsModel);
module.exports = productsModel;