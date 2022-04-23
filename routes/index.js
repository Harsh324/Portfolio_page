var express = require('express');
const { Double } = require('mongodb');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

// const data = [
//   {
//     name: "Harsh",
//     post: "Assistant Professor"
//   },
//   {
//     name: "Tripathi",
//     post: "Hole Manager"
//   },
//   {
//     name: "Giri",
//     post: "Ch**t chatora"
//   }
// ]

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
      res[0].education = res[0].education.split(';');
      res[0].publication = res[0].publication.split(';');
      res[0].supervision = res[0].supervision.split(';');
      res[0].responsibility = res[0].responsibility.split(';');
      res[0].experience = res[0].experience.split(';');
      res[0].currently_teaching = res[0].currently_teaching.split(';');
      res[0].research = res[0].research.split(';');
      console.log(res);
      
      result.render('ppPage', {res});
      db.close();
    });
    // console.log("here" + x);
  });
});

router.post('/saveData', function (req, res) {
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


module.exports = router;
