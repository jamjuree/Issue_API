import * as express from 'express';
import  {Router,Request,Response}   from 'express'
import {CompanyControler} from './controllers/company'
import {CustomerControler} from './controllers/customer'
import {UserControler} from './controllers/user'
import {IssueControler} from './controllers/issue'
import {MongoClient} from 'mongodb'
import *  as  bobyParser from 'body-parser'
import *  as  cors from 'cors'
import *  as  auth from './helpers/auth'
import { LoginController } from './controllers/login';

const app : express.Application = express();


// the port the express app will listen on
// ถ้าset port มา จะใช้ที่ set แต่ถ้าไม่ใช่ จะใช้ 3000
const port: string = process.env.PORT|| '3000';

app.use(cors());
app.use(bobyParser.json());
app.use(bobyParser.urlencoded(
    {
        extended: true
    }

));

app.use(auth.initialize());


app.use('/company' ,CompanyControler);
app.use('/customer' ,CustomerControler);
app.use('/user' ,UserControler);
app.use('/issue' ,IssueControler);
app.use('/login', LoginController);
//var mongodb;



// กด windows และ ตัวหนอน ````
app.listen(port,()=>{
    console.log(`Listening at http://localhost:${port}/`);
});







