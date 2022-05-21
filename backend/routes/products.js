const db = require('./connect-db');
const router = require('express').Router();

// Create DB
router.route('/createdb').get((req, res)=>{
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send('Database created...');
    });
});

// Insert
// router.route('/insert').get((req, res) => {
//     let post = {name: "Fazil", age: 15, date: new Date()};
//     let sql = 'INSERT INTO users SET ?';
//     let query = db.query(sql, post, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send("Added Successfully...");
//     });
// });

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
        let insertData = {name: productName, description: productDescription, price: productPrice, stocks: productStocks};
        let sql = 'INSERT INTO products SET ?';
        let query = db.query(sql, insertData, (err, result) => {
            if(err) throw err;
            console.log(result);
            res.send("Data inserted successfully!!!");
        });
    }
    else{
        let sql = `UPDATE products SET name='${productName}', description='${productDescription}', price=${productPrice}, stocks=${productStocks} WHERE id=${req.body.id}`;
        let query = db.query(sql, (err, result) => {
            if(err) throw err;
            console.log(result);
            res.send("Data updated successfully!!!");
        });
    }
    
});

// SELECT
router.route('/get').get((req, res) => {
    let q = "";
    if(req.query.q){
        q = req.query.q;
    }
    let col = 'name';
    let order = 'desc'
    let sql = `SELECT * FROM products WHERE name LIKE '%${q}%' OR description LIKE '%${q}%' ORDER BY ${col} ${order}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });

});

// DELETE
router.route('/delete').post((req, res) => {
    let id = req.body.id;
    let sql = `DELETE FROM products WHERE id = ${id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });

});

module.exports = router;