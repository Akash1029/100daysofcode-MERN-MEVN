# Day 2
Today I'll be deep diving more Into the Express Js and creating a Simple CRUD operation in express JS. for Templating and Frontend Stuff I'm using [PUG](https://pugjs.org/api/getting-started.html) and [Tailwind CSS](https://tailwindcss.com/) because right now I'm more focus on the Express Js Once I'm comfortable with Express, I will Create CRUDs with [React JS](https://react.dev/) and [Vue JS](https://vuejs.org/). So let's get into it. 😄

# Template 
## PUG 
Pug is a templating engine for Express. Templating engines are used to remove the cluttering of our server code with HTML, concatenating strings wildly to existing HTML templates. Pug is a very powerful templating engine which has a variety of features including filters, includes, inheritance, interpolation, etc. There is a lot of ground to cover on this.

To use Pug with Express, we need to install it,
```bash
npm install --save pug
```
Now that Pug is installed, set it as the templating engine for your app. You don't need to 'require' it. Add the following code to your index.js file.
```js
app.set('view engine', 'pug');
app.set('views','./views');
```
Now in create a views folder. 
Any PUG file you'll create in this folder, you can easily render that PUG file in your express route. 
Here's are simple example:-
- Create a PUG file named `first_view.pug` in views folder, and enter the following data in it.
```pug
doctype html
html
   head
      title Hello Pug
   body
      p.greetings#people Hello World!
```

To run this page, add the following route to your app −
```js
app.get('/first_template', function(req, res){
   res.render('first_view');
});
```

You will get the output as − Hello World! Pug converts this very simple looking markup to html. We don’t need to keep track of closing our tags, no need to use class and id keywords, rather use '.' and '#' to define them. The above code first gets converted to −
```html
<!DOCTYPE html>
<html>
   <head>
      <title>Hello Pug</title>
   </head>
   
   <body>
      <p class = "greetings" id = "people">Hello World!</p>
   </body>
</html>
```
Pug is capable of doing much more than simplifying HTML markup.

# ExpressJS - Serving static files
Static files are files that clients download as they are from the server. Create a new directory, public. Express, by default does not allow you to serve static files. You need to enable it using the following built-in middleware.
```js
app.use(express.static('public'));
```
Note − Express looks up the files relative to the static directory, so the name of the static directory is not part of the URL.

Note that the root route is now set to your public dir, so all static files you load will be considering public as root. To test that this is working fine, add any image file in your new public dir and change its name to "express-logo.webp". In your views, add this line in your `first_view.pug` file. 
```pug
img(src = "/express-logo.webp", alt = "Express js"
```
You'll see something like this in browser.
![Express Js](/day-2/CRUD/public/express-logo.webp)

## Multiple Static Directories
We can also set multiple static assets directories using the following program −
```js
app.use(express.static('public'));
app.use(express.static('images'));
```

## Virtual Path Prefix
We can also provide a path prefix for serving static files. For example, if you want to provide a path prefix like '/static', you need to include the following code in your index.js file −
```js
var express = require('express');
var app = express();

app.use('/static', express.static('public'));

app.listen(3000);
```

Now whenever you need to include a file, for example, a script file called main.js residing in your public directory, use the following script tag −
```html
<script src = "/static/main.js" />
```
This technique can come in handy when providing multiple directories as static files. These prefixes can help distinguish between multiple directories.

# ExpressJS - Form data
Forms are an integral part of the web. Almost every website we visit offers us forms that submit or fetch some information for us. To get started with forms, we will first install the body-parser(for parsing JSON and url-encoded data) and multer(for parsing multipart/form data) middleware.

To install the body-parser and multer, go to your terminal and use −
```bash
npm install --save body-parser multer
```

# ExpressJS - Database
We keep receiving requests, but end up not storing them anywhere. We need a Database to store the data. So now we'll work with MongoDB.
To install and read about Mongo, follow [this link]("https://www.mongodb.com/docs/manual/installation/").

In order to use Mongo with Express, we need a client API for node. There are multiple options for us, but for this tutorial, we will stick to [**mongoose**]('https://mongoosejs.com/'). Mongoose is used for document Modeling in Node for MongoDB. For document modeling, we create a Model (much like a class in document oriented programming), and then we produce documents using this Model (like we create documents of a class in OOP). All our processing will be done on these "documents", then finally, we will write these documents in our database.

## Setting up Mongoose
Now that you have installed Mongo, let us install Mongoose, the same way we have been installing our other node packages −
```bash
npm install --save mongoose
```
Before we start using mongoose, we have to create a database using the Mongo shell. To create a new database, open your terminal and enter "mongo". A Mongo shell will start, enter the following code −
```bash
use user_db;
```
A new database will be created for you. Whenever you open up the mongo shell, it will default to "test" db and you will have to change to your database using the same command as above.

To use Mongoose, we will require it in our index.js file and then connect to the mongodb service running on mongodb://localhost.

```js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_db');
```
Now our app is connected to our database, let us create a new Model. This model will act as a collection in our database. To create a new Model, use the following code, before defining any route −
```js
var userSchema = mongoose.Schema({
   name: String,
   age: Number,
   nationality: String
});
var User = mongoose.model("User", userSchema);
```
The above code defines the schema for a user and is used to create a Mongoose Mode User.

Now we have setup all the things for The CRUD. Now we can start working on the CRUD. 

In views folder I have created a user folder which have all the basic files for CRUD. and created all Routes in Index file. And 

### The packages I used in this project are. 

- [body-parser](https://expressjs.com/en/resources/middleware/body-parser.html)

   Node.js body parsing middleware. <br>
   Parse incoming request bodies in a middleware before your handlers, available under the req.body property.<br>
   `Note` As req.body’s shape is based on user-controlled input, all properties and values in this object are untrusted and should be validated before trusting. For example, req.body.foo.toString() may fail in multiple ways, for example the foo property may not be there or may not be a string, and toString may not be a function and instead a string or other user input.

   #### Installation
   ```bash
      npm install body-parser
   ```

- [express-session](https://www.npmjs.com/package/express-session)

   HTTP is stateless; in order to associate a request to any other request, you need a way to store user data between HTTP requests. Cookies and URL parameters are both suitable ways to transport data between the client and the server. But they are both readable and on the client side. Sessions solve exactly this problem. You assign the client an ID and it makes all further requests using that ID. Information associated with the client is stored on the server linked to this ID.
   #### Installation
   ```bash
      npm install express-session
   ```

- [express-flash](https://www.npmjs.com/package/express-flash)

   Flash is an extension of ``connect-flash`` with the ability to define a flash message and render it without redirecting the request. I used this to send messages from server side to client side. 
   #### Installation
   ```bash
      npm i express-flash
   ```

- [multer](http://expressjs.com/en/resources/middleware/multer.html)

   Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
   
   **NOTE:** Multer will not process any form which is not multipart (multipart/form-data).
   #### Installation
   ```bash
      npm install --save multer
   ```

- [mongoose-paginate-v2](https://www.npmjs.com/package/mongoose-paginate-v2)

   A custom pagination library for Mongoose with customizable labels.
   #### Installation
   ```bash
      npm install mongoose-paginate-v2
   ```

That's It for Today. 😃