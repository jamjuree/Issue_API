import  {Router,Request,Response}   from 'express';

import {MongoClient,ObjectID} from 'mongodb'
const router:Router= Router();

var mongodb;
// แสดงผล
router.get('/',(req:Request,res:Response)=>{

  //  res.send('hello wold')
     mongodb.collection("company").find().toArray().then((data)=>{
         // console.log(data);
          res.json(data);
     });
});

// แสดงผล  by ID
router.get('/findById/:id',(req:Request,res:Response)=>{
  
   
   let id =   new ObjectID(req.params.id) 
     mongodb.collection("company").findOne({_id:id}).then((data)=>{
         // console.log(data);
          res.json(data);
     });
});

router.post('/',(req:Request,res:Response)=>{

          let data =  req.body;
         // res.json(req.body);
          mongodb.collection("company").insertOne(data).then((data)=>{
             res.json(data);
          });


});


router.post('/search',(req:Request,res:Response)=>{

        //   let data =  req.body;
        //  // res.json(req.body);
        //   mongodb.collection("company").insertOne(data).then((data)=>{
        //      res.json(data);
        //   });
        let ret = {
           rows : [],
           total :0 };

           let data =  req.body;
         // res.json(req.body);
          mongodb.collection("company").find( {
          compName:   new RegExp(`${data.searchText}`) // แบบ %xx%
                  
              // compName:   new RegExp(data.searchText)   แบบ byone
          }).skip(data.numPage*data.rowPerPage)
            .limit(data.rowPerPage)
            .toArray().then((rows)=>{
                ret.rows =rows;
                
                 mongodb.collection("company").find(
                    {

                    compName:   new RegExp(`${data.searchText}`) // แบบ %xx%
                    }  
                     ).count().then((data)=> 
            {
                      ret.total=data;
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


router.delete('/:id',(req:Request,res:Response)=>{

 
   let id =   new ObjectID(req.params.id)     // req.params.id;

  
  //  res.send('hello wold')
     mongodb.collection("company").deleteOne({_id:id}).then((data)=>{
         // console.log(data);
          res.json(data);
     });
});

//การ update

router.put('/:id',(req:Request,res:Response)=>{

 
   let id =   new ObjectID(req.params.id)     // req.params.id;
   let data =  req.body;
  
  //  res.send('hello wold')
     mongodb.collection("company").updateOne({_id:id},data).then((data)=>{
         // console.log(data);
          res.json(data);
     });
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
  // console.log( db.collection("company").find().toArray());

 //  db.collection("company").find().toArray().then((data)=>{
         // console.log(data);
  // });


       
});

export const CompanyControler: Router = router;
