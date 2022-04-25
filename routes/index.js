const flash = require('connect-flash/lib/flash');
var express = require('express');
const { Double } = require('mongodb');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
var multer = require('multer')






var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })

var data;
/* GET home page. */
router.get('/', function(req, res, next) {
  MongoClient.connect(url, (err, db) => {
    if(err){
      console.log(err);
      return;
    }
    var dbo = db.db("ITW");
    dbo.collection('pfCardInfo').find({}).toArray(function (err, data){
      if(err) throw err;
      // console.log(data);
      res.render('index', {data});
    })
  });
});

router.get('/pfCardForm', function(req, res, next) {
  res.render('pfCardForm', {});
});

router.get('/pfPortfolio', function(req, res, next) {
  res.render('pfPortfolio', {});
});

router.get('/ppPage', function(req, result, next) {
  // console.log(req.query.id)
  MongoClient.connect(url, (err, db) => {
    if(err){
      console.log(err);
      return;
    }
    // console.log(req.body.name);?
    var dbo = db.db("ITW");
    dbo.collection('pfCardInfo').find({name: req.query.name, post: req.query.post}).toArray((err, res) => {
      if(err) throw err;
      try{
        res[0].education = res[0].education.split(';');
      }
      catch(err){
        console.log(err);
      }
      try{
        res[0].experience = res[0].experience.split(';');
      }
      catch(err){
        console.log(err);
      }

      try{
        res[0].research = res[0].research.split(';');
      }
      catch(err){
        console.log(err);
      }
      try{
        res[0].currently_teaching = res[0].currently_teaching.split(';');
      }
      catch(err){
        console.log(err);
      }
      try{
        res[0].responsibility = res[0].responsibility.split(';');
      }
      catch(err){
        console.log(err);
      }
      try{
        res[0].supervision = res[0].supervision.split(';');
      }
      catch(err){
        console.log(err);
      }
      try{
        res[0].publication = res[0].publication.split(';');
      }
      catch(err){
        console.log(err);
      }
      console.log(res);
      
      result.render('ppPage', {res});
      db.close();
    });
    // console.log("here" + x);
  });
});

router.post('/saveData', upload.single('profile-file'), function (req, res, next) {
  MongoClient.connect(url, (err, db) => {
    if(err){
      console.log(err);
      return;
    }
    var dbo = db.db("ITW");
    // console.log(req.body);
    dbo.collection("pfCardInfo").insertOne(req.body, (err, res) => {
      if(err){
        console.log(err);
      }
    })
  });
  res.redirect('/');
});





//Rendering the Login page
router.get('/Login', function(req, res, next) {
  console.log("Inside Login");
  res.render('Login');
});





// Rendering the Signup page
router.get('/Signup', function(req, res, next) {
  console.log("Inside Login");
  res.render('Signup', {});
});






// Validating the Login and redirecting to portfolio form to take input all details.
router.post('/Login_Validate', function(req, res, next){

  console.log("Username is : " + req.body.username);
  console.log("Password is : " + req.body.password);


  res.redirect('/pfPortfolio');
});






// Validating the Signup and redirecting to Login is success.
router.post('/Signup_Validate', function(req, res, next)
{
  console.log("Username is : " + req.body.username);
  console.log("Password is : " + req.body.password);
  console.log("Password1 is : " + req.body.password1);
  if(req.body.password == req.body.password1)
  {
    console.log("Password match");
    // request.flash('message', 'Signed up successfully!')
    res.redirect('Login');
  }
  else
  {
    console.log("Password mismatch trya agin");
    // alert('Password mismatch!  try again');
    // popup.alert({
    //   content: 'Hello!'
    // });
    // res.redirect('Signup');
    res.redirect('Signup');
  }
  

  
});

module.exports = router;
