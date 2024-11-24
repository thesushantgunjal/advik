var express = require ("express");
var app = express();
var bodyparser = require("body-parser");
var upload = require("express-fileupload")
var userroute = require("./routes/userroutes")
var adminroute = require("./routes/adminroutes");
var session = require ("express-session")


var app = express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(upload());
app.use(express.static("public"));
app.use(session({
    secret:"asdfghjkl;",
    resave :true,
    saveUninitialized:true
}));

app.use("/",userroute);
app.use("/admin",adminroute);


app.listen(1000);