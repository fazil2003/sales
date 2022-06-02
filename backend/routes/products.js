const db = require('./connect-db');
const router = require('express').Router();
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
        // let sql = `UPDATE products SET name='${productName}', description='${productDescription}', price=${productPrice}, stocks=${productStocks} WHERE id=${req.body.id}`;
        // let query = db.query(sql, (err, result) => {
        //     if(err) throw err;
        //     console.log(result);
        //     res.send("Data updated successfully!!!");
        // });
    }
    
});

// SELECT
router.route('/get').get((req, res) => {

    productModel.find((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Failed to retrieve the Course List: ' + err);
        }
    });


    // let q = "";
    // if(req.query.q){
    //     q = req.query.q;
    // }
    // let col = 'name';
    // let order = 'desc'
    // let sql = `SELECT * FROM products WHERE name LIKE '%${q}%' OR description LIKE '%${q}%' ORDER BY ${col} ${order}`;
    // let query = db.query(sql, (err, result) => {
    //     if(err) throw err;
    //     res.send(result);
    // });

});

// DELETE
router.route('/delete').post((req, res) => {
    // let id = req.body.id;
    // let sql = `DELETE FROM products WHERE id = ${id}`;
    // let query = db.query(sql, (err, result) => {
    //     if(err) throw err;
    //     res.send(result);
    // });

});

module.exports = router;