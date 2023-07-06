var express = require('express');
var app = express();

app.get('/', function(req, res){
   res.send("Hello world!");
});

//Express Routing
app.get('/hello', function(req, res){
    res.send("Hello World!");
 });
 
app.post('/hello', function(req, res){
    res.send("You just called the post method at '/hello'!\n");
});

// A special method, all, is provided by Express to handle all types of http methods at a particular route using the same function. To use this method, try the following.
app.all('/test', function(req, res){ //This method is generally used for defining middleware.
    res.send("HTTP method doesn't have any effect on this route!");
});

var things = require('./things.js');

//Middleware function to log request protocol
app.use('/things', function(req, res, next){
    console.log("A request for things received at " + Date.now());
    next();
});

// Route handler that sends the response
app.use('/things', things);

app.get('*', function(req, res){
    res.send('Sorry, this is an invalid URL.');
});

app.listen(3000);