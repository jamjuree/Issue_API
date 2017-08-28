"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var company_1 = require("./controllers/company");
var customer_1 = require("./controllers/customer");
var user_1 = require("./controllers/user");
var issue_1 = require("./controllers/issue");
var bobyParser = require("body-parser");
var cors = require("cors");
var app = express();
// the port the express app will listen on
// ถ้าset port มา จะใช้ที่ set แต่ถ้าไม่ใช่ จะใช้ 3000
var port = process.env.PORT || '3000';
app.use(cors());
app.use(bobyParser.json());
app.use(bobyParser.urlencoded({
    extended: true
}));
app.use('/company', company_1.CompanyControler);
app.use('/customer', customer_1.CustomerControler);
app.use('/user', user_1.UserControler);
app.use('/issue', issue_1.IssueControler);
//var mongodb;
// กด windows และ ตัวหนอน ````
app.listen(port, function () {
    console.log("Listening at http://localhost:" + port + "/");
});
//# sourceMappingURL=D:/MSC/Issue_API/server.js.map