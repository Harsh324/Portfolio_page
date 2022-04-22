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
      console.log(data);
      res.render('index', {data});
    })
  });
});

router.get('/pfCardForm', function(req, res, next) {
  res.render('pfCardForm', {});
});

router.post('/saveData', function (req, res) {
  MongoClient.connect(url, (err, db) => {
    if(err){
      console.log(err);
      return;
    }
    var dbo = db.db("ITW");
    dbo.collection("pfCardInfo").insertOne(req.body, (err, res) => {
      if(err){
        console.log(err);
      }
    })
  });
  res.redirect('/');
});


module.exports = router;
