const express=require('express'); 



const app=express(); 


app.get('/',(req,res)=>{
  res.status(200).send("<h1>HOME PAGE</h1>")
})


app.listen(5000,(req,res)=>{
   console.log("App listening port : 5000");
})