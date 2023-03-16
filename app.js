const express = require("express");
const bp = require("body-parser");
const date = require(__dirname + "/date.js");

console.log(date());
const PORT = process.env.PORT || 3030;
const app = express();
let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

let day_msg = date();

app.set('view engine', 'ejs');

app.use(bp.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res){
    
    
    res.render("list", {listTitle: day_msg, newListItems: items});

});


app.post("/", function(req, res){

    let item = req.body.newItem;
    // console.log(req.body);
    if(req.body.button === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }

    else{
    items.push(item);
    res.redirect("/");
}
});


app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItems: workItems});
});
 

app.get("/about", function(req, res){
    res.render("about");
});

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
  });