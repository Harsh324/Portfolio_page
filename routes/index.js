var express = require('express');
var router = express.Router();

const data = [
  {
    name: "Harsh",
    post: "Assistant Professor"
  },
  {
    name: "Tripathi",
    post: "Hole Manager"
  },
  {
    name: "Giri",
    post: "Ch**t chatora"
  }
]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {data});
});

module.exports = router;
