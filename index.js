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


const PORT = process.env.PORT || 3000; // Use environment variable or fallback to 3000
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});
