import  {Router,Request,Response}   from 'express';

import {MongoClient,ObjectID} from 'mongodb'
const router:Router= Router();

var mongodb;

router.post('/',(req:Request,res:Response)=>{

          let data =  req.body;
         // res.json(req.body);
          mongodb.collection("customer").insertOne(data).then((data)=>{
             res.json(data);
          });


});

router.post('/search',(req:Request,res:Response)=>{

        let ret = {
           rows : [],
           total :0 };

           let data =  req.body;

        

         
         mongodb.collection("customer").find( {
          customerName:   new RegExp(`${data.searchText}`) // แบบ %xx%
                  
              // compName:   new RegExp(data.searchText)   แบบ byone
          }).skip(data.numPage*data.rowPerPage)
            .limit(data.rowPerPage)

           .toArray().then((rows)=>{
                ret.rows =rows;
                
                 mongodb.collection("customer").find(
                    {

                    customerName:   new RegExp(`${data.searchText}`) // แบบ %xx%
                    }  
                     ).count()
                     .then((data)=> 
            {
                      ret.total=data;
                      res.json(ret);

            });


         
          });

         
   
});




// แสดงผล  by ID
router.get('/findById/:id',(req:Request,res:Response)=>{
  
   
   let id =   new ObjectID(req.params.id) 
     mongodb.collection("customer").findOne({_id:id}).then((data)=>{
         // console.log(data);
          res.json(data);
     });
});

router.get('/findByIdAll/:compcode',(req:Request,res:Response)=>{

   
   let compcode =   req.params.compcode
     mongodb.collection("customer").find({companyCode:compcode}).toArray().then((data)=>{
         // console.log(data);
          res.json(data);
     });
});


router.delete('/:id',(req:Request,res:Response)=>{

 
   let id =   new ObjectID(req.params.id)     // req.params.id;

  
  //  res.send('hello wold')
     mongodb.collection("customer").deleteOne({_id:id}).then((data)=>{
         // console.log(data);
          res.json(data);
     });
});

//การ update

router.put('/:id',(req:Request,res:Response)=>{

 
   let id =   new ObjectID(req.params.id)     // req.params.id;
   let data =  req.body;
  
  //  res.send('hello wold')
     mongodb.collection("customer").updateOne({_id:id},data).then((data)=>{
         // console.log(data);
          res.json(data);
     });
});


router.get('/',(req:Request,res:Response)=>{

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
      $lookup:
        {
          from: "company",
          localField: "companyCode",
          foreignField: "compCode",
          as: "companyShow"
        }
   }
    
   

]).toArray().then((data)=>{
         // console.log(data);
          res.json(data);
     });

//  var custcoll =    mongodb.collection("customer");

//      custcoll.find().toArray().then((data)=>{

//           res.json(data);
//      });

});


MongoClient.connect("mongodb://localhost:27017/issuedb", (err, db)=> {
 
    //console.log(err);
    if(err){
        console.log(err);
    }
    else
        {
              mongodb=db;

        }
 

       
});

    export const CustomerControler: Router = router;