
const mongo=require("mongoose");
const express= require('express');
const path=require("path");

const DB="mongodb+srv://Firstmongo:miniMongovms@cluster0.sshwd.mongodb.net/Mini_VMS_data?retryWrites=true&w=majority"

var user_schema;
var user_model;
mongo.connect(DB).then(()=>{
    console.log("Connected Succefully!!");
    user_schema=mongo.Schema({
        name:String,
        age:Number,
        phone:Number,
        email:String,
        address:String,
        gender:String,
    });

    user_model=mongo.model("Entry",user_schema,"userData");

}).catch((err)=> console.log("Error"));



const app=express();

app.use('/static',express.static('static'));
app.use(express.urlencoded());

app.set('view-engine','pug');
app.set('views', path.join(__dirname, 'views')) 

app.get('/',(req,res)=>{
    res.status('200').render("mini_vms.pug");
})

app.post('/',(req,res)=>{
    user_model.collection.insertOne(req.body);
})


app.listen(5050,()=>{
    console.log("Server startde on port 5050");
});