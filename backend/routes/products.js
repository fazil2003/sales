const mysql = require('mysql');
const router = require('express').Router();

// Create Connection
const db = mysql.createConnection({
    host        :   'localhost',
    user        :   'root',
    password    :   '',
    database    :   'sales'
});

// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log("MySql Connected");
});

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
router.route('/insert').get((req, res) => {
    let post = {name: "Fazil", age: 15, date: new Date()};
    let sql = 'INSERT INTO users SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send("Added Successfully...");
    });
});

// Select
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

module.exports = router;