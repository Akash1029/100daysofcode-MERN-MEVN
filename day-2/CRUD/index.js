var express = require('express');
var bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
var multer = require('multer');
var upload = multer();
var app = express();

var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

mongoose.connect('mongodb://localhost/user_db');

var userSchema = mongoose.Schema({
   name: String,
   age: Number,
   nationality: String
});

userSchema.plugin(mongoosePaginate);
var User = mongoose.model("User", userSchema);

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));
// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded
app.use(upload.array()); 
app.use(session({
   secret: 'neko',
   resave: false,
   saveUninitialized: true
}));
app.use(flash());


//Routes
app.get("/first_template", function (req, res) {
   res.render('first_view');
})

app.get('/user', async function(req, res){

   const {page} = req.query;
   const options = {page: parseInt(page, 10) || 1,limit: 10}
   User.paginate({}, options).then((results, err) => {
      if(!err){
         //Pass the totalpages number to pug along with the result
         res.render('user/user', {user: results.docs, page_count: results.totalPages, page_detail: results})
      }
   })

   // const user = await User.find({});
   // res.render('user/user', {user: user});
});

app.get('/user/create', function(req, res){
   res.render('user/create');
});

app.post('/user/create', function(req, res){
   var userInfo = req.body;
   if(!userInfo.name || !userInfo.age || !userInfo.nationality){
      req.flash('error', 'Please enter valid Information');
      res.redirect('back');    
   }else {
      var newUser = new User({
         name: userInfo.name,
         age: userInfo.age,
         nationality: userInfo.nationality
      });
		
      newUser.save().then((newArticle) => {
         req.flash('success', 'User created successfully');
         res.redirect('/user');    
       })
       .catch((err) => {
         req.flash('error', err);
         res.redirect('back');
       });
   }

});

app.get("/user/edit/:id", async function(req, res){
   const user = await User.findById(req.params.id);
   res.render('user/edit', {user: user});
});

app.post("/user/edit/:id", function(req, res){
   var userInfo = req.body;
   var id = req.params.id;
   // console.log(userInfo);
   if(!userInfo.name || !userInfo.age || !userInfo.nationality){
      req.flash('error', 'Please enter valid Information');
      res.redirect('back');    
   }else {
      var newUser = {
         name: userInfo.name,
         age: userInfo.age,
         nationality: userInfo.nationality
      };
		
      User.findByIdAndUpdate(id, newUser).then((newArticle) => {
         req.flash('success', 'User updated successfully');
         res.redirect('/user');    
       })
       .catch((err) => {
         req.flash('error', err);
         res.redirect('back');
       });
   }
});

app.get("/user/delete/:id", async function(req, res){
   var {id} = req.params;
   const deletedUser = await User.findByIdAndRemove(id);

   if (!deletedUser) {
      return res.status(404).json({ message: 'User not found.' });
   }

   req.flash('success', 'User deleted successfully');
   res.redirect('/user');    
});

app.get("/search", async function(req, res) {
   try {
      const query = req.query.query.toString();
      const {page} = req.query;
      const options = {page: parseInt(page, 10) || 1,limit: 10}
      if (query.length > 0) {
         var user = await User.paginate({ name: { $regex: query } }, options);
      }else {
         var user = await User.paginate({ name: { $regex: query } }, options);  
      }
      res.render("user/user-data", { user: user.docs, page_count: user.totalPages, page_detail: user }, (error, html) => {
        if (error) {
          console.error("Error rendering user data:", error);
          res.status(500).json({ error: "Internal server error" });
        } else {
          res.json({ html: html });
        }
      });
    } catch (error) {
      console.error("Error searching for user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
});

app.get("*", function(req, res){
   res.send('Page not found');
});

app.listen(3000);