var express = require('express');
var router = express.Router();
var db = require("../config/mysql_pool");

/* GET home page. */
router.get('/', function (req, res, next) {
    //res.render('index', { title: 'Express' });
    res.sendFile('index.html');
});


module.exports = router;
