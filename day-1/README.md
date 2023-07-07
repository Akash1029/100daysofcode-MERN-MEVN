# Day 1
# Learning Express Js
For First couple of days. I'll be learning Express Js. 
Today I'll be learning basics of Express Js.
Like: 
- [How to setup Express enviroment.](#seting-up-the-express-environment)
- [The basic packages to install to get started.](#youre-all-set-start-development-using-the-express-framework)
- [First Hello world](#hello-world)
- [What is Express Routing](#express-routing)
- [URL Building (Route parameters)](#expressjs---url-building)
- [Middleware](#expressjs-middleware)

# Express Js
    Express Js provides a minimal Interface to built an application. It provides us the tools that are required to build our app. It is flexible as there are numerous modules available on npm, which can be directly plugged into Express.

## Seting up the Express Environment
Confirm that node and npm are installed by running the following commands in your terminal.

```bash
node --version
npm --version
```
if you have both of them Setup runnig in you system. Let us set up our development project.

### Step 1 − Start your terminal/cmd, create a new folder named hello-world and cd (create directory) into it −

```bash
mkdir expressJs
cd expressJs
```
### Step 2 − Now to create the package.json file using npm, use the following code.

```bash     
npm init
```
It'll ask for some Information about your project.
Just keep pressing enter, and enter your name at the “author name” field.

### Step 3 − Now we have our package.json file set up, we will further install Express. To install Express and add it to our package.json file, use the following command −

```bash    
npm install --save express
```
### You're all set start development using the Express framework.
To make our development process a lot easier, we will install a tool from npm, nodemon. This tool restarts our server as soon as we make a change in any of our files, otherwise we need to restart the server manually after each file modification. To install nodemon, use the following command −
    
```bash   
npm install -g nodemon
```
## Hello World 
We have set up the development, now it is time to start developing our first app using Express. Create a new file called index.js and type the following in it.
    
```js
var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.send("Hello world!");
});

app.listen(3000);
```

Save the file, go to your terminal and type the following.

```bash
nodemon index.js
```

This will start the server. To test this app, open your browser and go to http://localhost:3000 and a message will be displayed as in the following screenshot.

![Hello world](/day-1/hello-world/public/hello-world.png)

## Express Routing
**_Routing_** refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).

Each route can have one or more handler functions, which are executed when the route is matched.
Route definition takes the following structure:

```js
app.METHOD(PATH, HANDLER)
```
Where:
- app is an instance of express.
- METHOD is an HTTP request method, in lowercase.
- PATH is a path on the server.
- HANDLER is the function executed when the route is matched.

I have created two routes in Index file for Get and Post request. you can test get post request directly in browser. you'll get `Hello World` Message there. But to test Post request. open your terminal and cURL to execute the following request.
```bash
curl -X POST "http://localhost:3000/hello"
```

## Routers
Defining routes like above is very tedious to maintain. To separate the routes from our main index.js file, I'll be Express.Router to call all the routes from things.js to index file.

The app.use function call on route '/things' attaches the things router with this route. Now whatever requests our app gets at the '/things', will be handled by our things.js router. The '/' route in things.js is actually a subroute of '/things'. Visit localhost:3000/things/ and you will see the following output.

![Express Router](/day-1/hello-world/public/express-router.png)

Routers are very helpful in separating concerns and keep relevant portions of our code together. They help in building maintainable code. You should define your routes relating to an entity in a single file and include it using the above method in your index.js file.

## ExpressJS - URL Building
### Route parameters
Now we know how to define Route. but these routes are Static or fixed. To make `Dynamic routes` we're gonna use **_Route Parameters_**.

**_Route Parameters_** are named URL segments that are used to capture the values specified at their position in the URL. The captured values are populated in the req.params object, with the name of the route parameter specified in the path as their respective keys.

Here is an example of a dynamic route − 
add the following code in things.js file.
```js
    router.get('/:id', function(req, res){
        res.send('The id you specified is ' + req.params.id);
    });
```
To test this go to http://localhost:3000/things/123. The following response will be displayed.

![Route Parameters](/day-1/hello-world/public/route-parameter.png)

Hurray :partying_face: we can create dynamic routes. 

Whenever we enter an undefined route in browser we get "Cannot GET <your-request-route>" message as response. To replace This message with 404 not found page. we can do it by adding this simple route at the end of all routes -
```js
    //Other routes here
    app.get('*', function(req, res){
        res.send('Sorry, this is an invalid URL.');
    });
```

## ExpressJs Middleware
Middleware functions are functions that have access to the request object (req), the response object (res), and the next function in the application’s request-response cycle. The next function is a function in the Express router which, when invoked, executes the middleware succeeding the current middleware.

Middleware functions can perform the following tasks:

- Execute any code.
- Make changes to the request and the response objects.
- End the request-response cycle.
- Call the next middleware in the stack.

If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.

The following figure shows the elements of a middleware function call:

![ExpressJs Middleware](/day-1/hello-world/public/express-middleware.png)

Here is a simple example of a middleware function in action −

```js
var express = require('express');
var app = express();

//Simple request time logger
app.use(function(req, res, next){
   console.log("A new request received at " + Date.now());
   
   //This function call is very important. It tells that more processing is
   //required for the current request and is in the next middleware
   function route handler.
   next();
});

app.listen(3000);
```
The above middleware is called for every request on the server. So after every request, we will get the following message in the console −
    A new request received at 1467267512545

To restrict it to a specific route (and all its subroutes), provide that route as the first argument of app.use(). See the [**index.js**](/day-1/hello-world/index.js) file. I have added a middleware before the things route. So wherever I request any route from things route. I will get a console log in my terminal,
    
    A request for things received at 1688645794024

### Order of Middleware Calls
One of the most important things about middleware in Express is the order in which they are written/included in your file; the order in which they are executed, given that the route matches also needs to be considered.

**For example, in the following code snippet, the first function executes first, then the route handler and then the end function. This example summarizes how to use middleware before and after route handler; also how a route handler can be used as a middleware itself.**

```js

var express = require('express');
var app = express();

//First middleware before response is sent
app.use(function(req, res, next){
   console.log("Start");
   next();
});

//Route handler
app.get('/', function(req, res, next){
   res.send("Middle");
   next();
});

app.use('/', function(req, res){
   console.log('End');
});

app.listen(3000);

```
When we visit '/' after running this code, we receive the response as Middle and on our console −

    Start
    End

The following diagram summarizes what we have learnt about middleware −
![ExpressJs Middleware](/day-1/hello-world/public/middleware_desc.jpg)

Now that we have covered how to create our own middleware, let us discuss some of the most commonly used community created middleware.

And that's a wrap for today. 🥳