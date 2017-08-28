"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mongodb_1 = require("mongodb");
var router = express_1.Router();
var mongodb;
// แสดงผล
router.get('/', function (req, res) {
    //  res.send('hello wold')
    mongodb.collection("company").find().toArray().then(function (data) {
        // console.log(data);
        res.json(data);
    });
});
// แสดงผล  by ID
router.get('/findById/:id', function (req, res) {
    var id = new mongodb_1.ObjectID(req.params.id);
    mongodb.collection("company").findOne({ _id: id }).then(function (data) {
        // console.log(data);
        res.json(data);
    });
});
router.post('/', function (req, res) {
    var data = req.body;
    // res.json(req.body);
    mongodb.collection("company").insertOne(data).then(function (data) {
        res.json(data);
    });
});
router.post('/search', function (req, res) {
    //   let data =  req.body;
    //  // res.json(req.body);
    //   mongodb.collection("company").insertOne(data).then((data)=>{
    //      res.json(data);
    //   });
    var ret = {
        rows: [],
        total: 0
    };
    var data = req.body;
    // res.json(req.body);
    mongodb.collection("company").find({
        compName: new RegExp("" + data.searchText) // แบบ %xx%
        // compName:   new RegExp(data.searchText)   แบบ byone
    }).skip(data.numPage * data.rowPerPage)
        .limit(data.rowPerPage)
        .toArray().then(function (rows) {
        ret.rows = rows;
        mongodb.collection("company").find({
            compName: new RegExp("" + data.searchText) // แบบ %xx%
        }).count().then(function (data) {
            ret.total = data;
            res.json(ret);
        });
        //     mongodb.collection("company").count().then((data)=> 
        // {
        //           ret.total=data;
        //           res.json(ret);
        // });
        // res.json(data);
    });
});
router.delete('/:id', function (req, res) {
    var id = new mongodb_1.ObjectID(req.params.id); // req.params.id;
    //  res.send('hello wold')
    mongodb.collection("company").deleteOne({ _id: id }).then(function (data) {
        // console.log(data);
        res.json(data);
    });
});
//การ update
router.put('/:id', function (req, res) {
    var id = new mongodb_1.ObjectID(req.params.id); // req.params.id;
    var data = req.body;
    //  res.send('hello wold')
    mongodb.collection("company").updateOne({ _id: id }, data).then(function (data) {
        // console.log(data);
        res.json(data);
    });
});
mongodb_1.MongoClient.connect("mongodb://localhost:27017/issuedb", function (err, db) {
    //console.log(err);
    if (err) {
        console.log(err);
    }
    else {
        mongodb = db;
    }
    // console.log( db.collection("company").find().toArray());
    //  db.collection("company").find().toArray().then((data)=>{
    // console.log(data);
    // });
});
exports.CompanyControler = router;
//# sourceMappingURL=D:/MSC/Issue_API/controllers/company.js.map