# Learning Express Js
For First couple of days. I'll be learning Express Js.

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
Defining routes like above is very tedious to maintain. To separate the routes from our main index.js file, I'll be Express.Router to call all the routes from routes.js to index file.

The app.use function call on route '/routes' attaches the things router with this route. Now whatever requests our app gets at the '/routes', will be handled by our routes.js router. The '/' route in routes.js is actually a subroute of '/routes'. Visit localhost:3000/routes/ and you will see the following output.

![Express Router](/day-1/hello-world/public/express-router.png)

Routers are very helpful in separating concerns and keep relevant portions of our code together. They help in building maintainable code. You should define your routes relating to an entity in a single file and include it using the above method in your index.js file.

## ExpressJS - URL Building
### Route parameters
Now we know how to define Route. but these routes are Static or fixed. To make `Dynamic routes` we're gonna use **_Route Parameters_**.

**_Route Parameters_** are named URL segments that are used to capture the values specified at their position in the URL. The captured values are populated in the req.params object, with the name of the route parameter specified in the path as their respective keys.

Here is an example of a dynamic route − 
add the following code in routes.js file.
```js
    router.get('/:id', function(req, res){
        res.send('The id you specified is ' + req.params.id);
    });
```
To test this go to http://localhost:3000/routes/123. The following response will be displayed.

![Route Parameters](/day-1/hello-world/public/route-parameter.png)

Hurray `:partying_face:` we can create dynamic routes. 

Whenever we enter an undefined route in browser we get "Cannot GET <your-request-route>" message as response. To replace This message with 404 not found page. we can do it by adding this simple route at the end of all routes -
```js
    //Other routes here
    app.get('*', function(req, res){
        res.send('Sorry, this is an invalid URL.');
    });
```

<!-- 

# PUG
    Pug (earlier known as Jade) is a terse language for writing HTML templates. It −
        1. Produces HTML
        2. Supports dynamic code
        3. Supports reusability (DRY)

# MongoDB and Mongoose
    MongoDB is an open-source, document database designed for ease of development and scaling. This database is also used to store data.
    Mongoose is a client API for node.js which makes it easy to access our database from our Express application. -->