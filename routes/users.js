var express = require('express');
var router = express.Router();
var db = require('../config/mysql_pool');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('users');
});

//login
router.post('/login', function (req, res, next) {
});

//registe
router.post('/registe', function (req, res, next) {
});

module.exports = router;
