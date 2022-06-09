const db = require('./connect-db');
const router = require('express').Router();
var ObjectId = require('mongodb').ObjectId;
var productModel = require('./productModel');

// Create DB
router.route('/createdb').get((req, res)=>{
    let sql = 'use SALES';
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send('Database created...');
    });
});


// INSERT
router.route('/insert').post((req, res) => {

    let productName = "";
    let productDescription = "";
    let productPrice = "";
    let productStocks = "";

    productName = req.body.name;
    productDescription = req.body.description;
    productPrice = req.body.price;
    productStocks = req.body.stocks;

    if(req.body.id == 0){

        var insertData = new productModel({
            name: productName,
            description: productDescription,
            price: productPrice,
            stocks: productStocks
        });
           
        insertData.save((err, doc) => {
            if (!err){
                res.send('Data added successfully');
            }
            else{}
        });
    }
    else{
        var myquery = { _id: new ObjectId(req.body.id) };
        console.log(myquery);
        var newvalues = { $set: {name: productName, description: productDescription, price: productPrice, stocks: productStocks} };
        db.collection("products").updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
            console.log(res);
        });
        
    }
    
});

// SELECT
router.route('/get').get((req, res) => {

    let q = "";
    if(req.query.q){

        q = req.query.q;
        // console.log("q="+q);

        productModel.find({$or:[{ 'name': new RegExp(q, 'i') }, { 'description': new RegExp(q, 'i') }]}, (err, docs) => {
            if (!err) {
                res.send(docs);
            } else {
                console.log('Failed to retrieve the Course List: ' + err);
            }
        });    

    }
    else{
        productModel.find((err, docs) => {
            if (!err) {
                res.send(docs);
            } else {
                console.log('Failed to retrieve the Course List: ' + err);
            }
        });
    }

});

// DELETE
router.route('/delete').post((req, res) => {
    var myquery = { _id: new ObjectId(req.body.id) };
    db.collection("products").deleteOne(myquery, function(err, res) {
        if (err) throw err;
    });
    res.send("Deleted");
});

// REPORTS
router.route('/reports').get((req, res) => {

    // db.collection.aggregate([
    //     {$group : {_id:"$field_name", count:{$sum:1}}}
    // ])

    productModel.aggregate([
        {$group : {_id:"$name", count:{$sum:1}}}
    ], (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Failed to retrieve the Course List: ' + err);
        }
    })

    // productModel.find((err, docs) => {
    //     if (!err) {
    //         res.send(docs);
    //     } else {
    //         console.log('Failed to retrieve the Course List: ' + err);
    //     }
    // });    

});

module.exports = router;