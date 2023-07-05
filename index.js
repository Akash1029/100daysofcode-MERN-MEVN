var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
const session = require('express-session');
const flash = require('express-flash');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_db');

var personSchema = mongoose.Schema({
   name: String,
   age: Number,
   nationality: String
});
var Person = mongoose.model("Person", personSchema);

app.set('view engine', 'pug');
app.set('views', './views');

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(session({
   secret: 'neko',
   resave: false,
   saveUninitialized: true
 }));
 app.use(flash());


app.get('/person', async function(req, res){
   const person = await Person.find({});
   res.render('person/person', {person: person});
});

app.get('/person/create', function(req, res){
   res.render('person/create');
});

app.post('/person/create', function(req, res){
   var personInfo = req.body;
   console.log(personInfo);
   if(!personInfo.name || !personInfo.age || !personInfo.nationality){
      req.flash('error', 'Please enter valid Information');
      res.redirect('back');    
   }else {
      var newPerson = new Person({
         name: personInfo.name,
         age: personInfo.age,
         nationality: personInfo.nationality
      });
		
      newPerson.save().then((newArticle) => {
         req.flash('success', 'Person created successfully');
         res.redirect('/person');    
       })
       .catch((err) => {
         req.flash('error', err);
         res.redirect('back');
       });
   }

});

app.get("/person/edit/:id", async function(req, res){
   const person = await Person.findById(req.params.id);
   res.render('person/edit', {person: person});
});

app.post("/person/edit/:id", function(req, res){
   var personInfo = req.body;
   var id = req.params.id;
   // console.log(personInfo);
   if(!personInfo.name || !personInfo.age || !personInfo.nationality){
      req.flash('error', 'Please enter valid Information');
      res.redirect('back');    
   }else {
      var newPerson = {
         name: personInfo.name,
         age: personInfo.age,
         nationality: personInfo.nationality
      };
		
      Person.findByIdAndUpdate(id, newPerson).then((newArticle) => {
         req.flash('success', 'Person updated successfully');
         res.redirect('/person');    
       })
       .catch((err) => {
         req.flash('error', err);
         res.redirect('back');
       });
   }
});

app.get("/person/delete/:id", async function(req, res){
   var {id} = req.params;
   const deletedDocument = await Person.findByIdAndRemove(id);

   if (!deletedDocument) {
      return res.status(404).json({ message: 'Document not found.' });
   }

   req.flash('success', 'Person deleted successfully');
   res.redirect('/person');    
});

app.get("/find-person", function(req, res) {
   Person.find({name: "Akash"}).then((pr) => {
      res.send(pr);
   }).catch((err) => {
      res.send(err);
   });
});

app.get("*", function(req, res){
   res.send('Page not found');
});

app.listen(3000);