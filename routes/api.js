var express = require('express');
var router = express.Router();

var db = require('../config/mysql_pool');

router.get('/', function (req, res) {
    res.send(req.params.username);
});

router.post('/', function (req,res) {
    var username = req.params.username;
    var password = req.params.password;
    db("select * from user where name='chenjun1'", function (err, results, fields) {
        if(err){
            throw err;
        }
        res.send(results[0]);
    });
    //res.send('');
});

module.exports = router;
