
const mongo=require("mongoose");
const express= require('express');
const path=require("path");
const port=process.env.PORT || 8000;
const Jimp =require("jimp");

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
var img_string="";

app.use('/static',express.static('static'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}))

app.set('view-engine','pug');
app.set('views', path.join(__dirname, 'views')) 

app.get('/',(req,res)=>{
    res.status('200').render("mini_vms.pug");
})

app.post('/',(req,res)=>{

    if(req.body.name!="" && req.body.age<100 && req.body.phone.length<=10 && req.body.email.includes("@gmail.com") && req.body.add.length!=""){
        async function textOverlay() {
            // Reading image
            var take=(req.body.Image).replace("data:image/png;base64,","")
            var buf = Buffer.from(take, 'base64');

            const image = await Jimp.read('./static/card.png');
            const per_image = await Jimp.read(buf)
        
            per_image.resize(319,400);
            // Defining the text font
            const fontb = await Jimp.loadFont("./static/fonts/basefont.fnt");
            const fontm = await Jimp.loadFont("./static/fonts/basemedium.fnt");
            const fontnum = await Jimp.loadFont("./static/fonts/numeric_font.fnt");
            const fonts = await Jimp.loadFont("./static/fonts/small_font.fnt");
            
            image.print(fontb, 638, 237, req.body.name);
            image.print(fontm, 638, 320, req.body.gender);
            image.print(fontnum, 800, 320, req.body.age);
            image.print(fonts, 700, 380, req.body.email);
            image.print(fonts, 700, 437, req.body.phone);
            image.print(fonts, 700, 493, (req.body.add).substring(0, 40));
            image.composite(per_image,200,200);
            image.getBase64(Jimp.AUTO, function(err, data){
                 res.status('200').render("mini_card.pug",{card_img:data});
            });
    }
    textOverlay();
    
    user_model.collection.insertOne(req.body);
}
});


app.listen(port,()=>{
    console.log("Server started on port 5050");
});