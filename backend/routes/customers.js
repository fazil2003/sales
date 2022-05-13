const db = require('./connect-db');
const router = require('express').Router();

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
    let sql = `SELECT * FROM customers WHERE name LIKE '%${q}%' OR occupation LIKE '%${q}%' OR address LIKE '%${q}%' OR phone LIKE '%${q}%' OR email LIKE '%${q}%' ORDER BY ${col} ${order}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });

});

module.exports = router;