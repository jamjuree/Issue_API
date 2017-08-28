"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mongodb_1 = require("mongodb");
var router = express_1.Router();
var mongodb;
router.post('/', function (req, res) {
    var data = req.body;
    // res.json(req.body);
    mongodb.collection("customer").insertOne(data).then(function (data) {
        res.json(data);
    });
});
router.post('/search', function (req, res) {
    var ret = {
        rows: [],
        total: 0
    };
    var data = req.body;
    mongodb.collection("customer").find({
        customerName: new RegExp("" + data.searchText) // แบบ %xx%
        // compName:   new RegExp(data.searchText)   แบบ byone
    }).skip(data.numPage * data.rowPerPage)
        .limit(data.rowPerPage)
        .toArray().then(function (rows) {
        ret.rows = rows;
        mongodb.collection("customer").find({
            customerName: new RegExp("" + data.searchText) // แบบ %xx%
        }).count()
            .then(function (data) {
            ret.total = data;
            res.json(ret);
        });
    });
});
// แสดงผล  by ID
router.get('/findById/:id', function (req, res) {
    var id = new mongodb_1.ObjectID(req.params.id);
    mongodb.collection("customer").findOne({ _id: id }).then(function (data) {
        // console.log(data);
        res.json(data);
    });
});
router.get('/findByIdAll/:compcode', function (req, res) {
    var compcode = req.params.compcode;
    mongodb.collection("customer").find({ companyCode: compcode }).toArray().then(function (data) {
        // console.log(data);
        res.json(data);
    });
});
router.delete('/:id', function (req, res) {
    var id = new mongodb_1.ObjectID(req.params.id); // req.params.id;
    //  res.send('hello wold')
    mongodb.collection("customer").deleteOne({ _id: id }).then(function (data) {
        // console.log(data);
        res.json(data);
    });
});
//การ update
router.put('/:id', function (req, res) {
    var id = new mongodb_1.ObjectID(req.params.id); // req.params.id;
    var data = req.body;
    //  res.send('hello wold')
    mongodb.collection("customer").updateOne({ _id: id }, data).then(function (data) {
        // console.log(data);
        res.json(data);
    });
});
router.get('/', function (req, res) {
    //  res.send('hello wold')
    //  mongodb.collection("customer").find().forEach(
    //     function (newBook) {
    //         newBook.category = db.categories.findOne( { "_id": newBook.category } );
    //         newBook.lendings = db.lendings.find( { "book": newBook._id  } ).toArray();
    //         newBook.authors = db.authors.find( { "_id": { $in: newBook.authors }  } ).toArray();
    //         db.booksReloaded.insert(newBook);
    //     }
    // );
    // mongodb.collection("customer").findOne({idCompany: _id}, function(err, company) {
    //   console.log(company.);
    // });
    mongodb.collection("customer").aggregate([
        {
            $lookup: {
                from: "company",
                localField: "companyCode",
                foreignField: "compCode",
                as: "companyShow"
            }
        }
    ]).toArray().then(function (data) {
        // console.log(data);
        res.json(data);
    });
    //  var custcoll =    mongodb.collection("customer");
    //      custcoll.find().toArray().then((data)=>{
    //           res.json(data);
    //      });
});
mongodb_1.MongoClient.connect("mongodb://localhost:27017/issuedb", function (err, db) {
    //console.log(err);
    if (err) {
        console.log(err);
    }
    else {
        mongodb = db;
    }
});
exports.CustomerControler = router;
//# sourceMappingURL=D:/MSC/Issue_API/controllers/customer.js.map