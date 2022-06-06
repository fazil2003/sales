const db = require('./connect-db');
const router = require('express').Router();
var ObjectId = require('mongodb').ObjectId;
var saleModel = require('./saleModel');

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

    let saleCustomer = "";
    let saleProduct = "";
    let salePrice = "";

    saleCustomer = req.body.customer;
    saleProduct = req.body.product;
    salePrice = req.body.price;

    if(req.body.id == 0){

        var insertData = new saleModel({
            customer: saleCustomer,
            product: saleProduct,
            price: salePrice,
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
        var newvalues = { $set: {customer: saleCustomer, product: saleProduct, price: salePrice} };
        db.collection("sales").updateOne(myquery, newvalues, function(err, res) {
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

        saleModel.find(({ 'customer': new RegExp(q, 'i') }), (err, docs) => {
            if (!err) {
                res.send(docs);
            } else {
                console.log('Failed to retrieve the Course List: ' + err);
            }
        });    

    }
    else{
        saleModel.find((err, docs) => {
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
    // let id = req.body.id;
    // let sql = `DELETE FROM sales WHERE id = ${id}`;
    // let query = db.query(sql, (err, result) => {
    //     if(err) throw err;
    //     res.send(result);
    // });

});

module.exports = router;