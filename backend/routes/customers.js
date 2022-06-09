const db = require('./connect-db');
const router = require('express').Router();
var ObjectId = require('mongodb').ObjectId;
var customerModel = require('./customersModel');

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

    let customerName = "";
    let customerOccupation = "";
    let customerAddress = "";
    let customerPhone = "";
    let customerEmail = "";

    customerName = req.body.name;
    customerOccupation = req.body.occupation;
    customerAddress = req.body.address;
    customerPhone = req.body.phone;
    customerEmail = req.body.email;

    if(req.body.id == 0){

        var insertData = new customerModel({
            name: customerName,
            occupation: customerOccupation,
            address: customerAddress,
            phone: customerPhone,
            email: customerEmail
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
        var newvalues = { $set: {name: customerName, occupation: customerOccupation, address: customerAddress, phone: customerPhone, email: customerEmail} };
        db.collection("customers").updateOne(myquery, newvalues, function(err, res) {
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

        customerModel.find({$or:[{ 'name': new RegExp(q, 'i') }, { 'occupation': new RegExp(q, 'i') }, { 'address': new RegExp(q, 'i') }, { 'phone': new RegExp(q, 'i') }, { 'email': new RegExp(q, 'i') }]}, (err, docs) => {
            if (!err) {
                res.send(docs);
            } else {
                console.log('Failed to retrieve the Course List: ' + err);
            }
        });    

    }
    else{
        customerModel.find({}).sort({name: 1}).exec((err, docs) => {
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
    db.collection("customers").deleteOne(myquery, function(err, res) {
        if (err) throw err;
    });
    res.send("Deleted");
});

module.exports = router;