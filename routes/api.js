var express = require('express');
var router = express.Router();

var db = require('../config/mysql_pool');

router.get('/', function (req, res) {
    res.send(req.params.username);
});

router.post('/', function (req,res) {
    var username = req.body.username;
    var password = req.body.password;
    db("select * from user where name='chenjun1'", function (results, fields) {
        //res.send('ssdas');
        res.json(username);
    });
    //res.send('');
});

module.exports = router;
