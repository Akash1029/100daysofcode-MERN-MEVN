var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
const user = require("./routes/user");

const InitiateMongoServer = require("./config/db");
InitiateMongoServer();

app.set('view engine', 'pug');
app.set('views','./views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({secret: "Neko"}));

app.get("/", function(req, res) {
    res.send("Hello Home");
})

function checkSignIn(req, res, next){
    console.log(req.session);

    if(req.session.user){
       next();     //If session exists, proceed to page
    } else {
       var err = new Error("Not logged in!");
       console.log(req.session.user);
       next(err);  //Error, trying to access unauthorized page!
    }
 }

app.use("/user", user);
app.get('/admin', checkSignIn, function(req, res){
    res.render('admin', {user: req.session.user})
});
app.listen(3000);