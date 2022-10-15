// Work with HTML and CSS Files in nodejs

const fs=require("fs");
const express=require("express");
const path=require('path')

const app=express();

app.use(express.urlencoded({extended: false}));

app.set("view engine","ejs");

app.use(express.static('public'))  //make sure that if their is request is made that request require an static file then it will provide files 

app.post("/share",function(req,rep){

    const restraurnt=req.body;
    // console.log(restraurnt);
    const filepath=path.join(__dirname,'users','res.json');
    // console.log(filepath);

    const raw_data=fs.readFileSync(filepath)
    // console.log(raw_data);

    var stored_data=JSON.parse(raw_data);
    // console.log(stored_data);
    stored_data.push(restraurnt);
    // console.log(restraurnt);
    fs.writeFileSync(filepath,JSON.stringify(stored_data));

    rep.redirect('/success');
 

});

app.get("/success",function(req,rep){
    rep.send("<h1>Sucess</h1>");
});

app.get("/contact",function(req,rep){
  rep.render("contact");
});

app.get("/restaurants",function(req,rep){
    const filepath=path.join(__dirname,'users','res.json');
    // console.log(filepath);
    const raw_data=fs.readFileSync(filepath)
    // console.log(raw_data);

    var stored_data=JSON.parse(raw_data);
     
    number=stored_data.length;
    rep.render("restaurants",{numberofres:number,restraurnt:stored_data});
});

app.get('/',function(req,rep){
    // const filepath=path.join(__dirname,'view','index.html');
    // rep.sendFile(filepath);
    rep.render("index")
});

app.get("/form",function(req,rep){
    rep.render("form")

});
app.get("/restaturent_id/:food_id",function(req,rep){
    id=req.params.food_id;
    const filepath=path.join(__dirname,'users','res.json');
    // console.log(filepath);

    const raw_data=fs.readFileSync(filepath)
    // console.log(raw_data);

    var stored_data=JSON.parse(raw_data);

    restaturent_details=stored_data[id-1];
    rep.render("show_full",{restraurnt:restaturent_details});
});


app.listen(3000);