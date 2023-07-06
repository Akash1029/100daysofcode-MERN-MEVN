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

var routes = require('./routes.js');

app.use('/routes', routes);

router.get('*', function(req, res){
    res.send('Sorry, this is an invalid URL.');
});

app.listen(3000);