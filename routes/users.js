var express = require('express');
var router = express.Router();
var crypto = require("crypto");//node自带加密模块
var db = require('../config/mysql_pool');//数据库配置文件

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('users');
});

//login
router.post('/login', function (req, res, next) {
    if(req.session.userid){
        res.json({
            ok:0,
            info:'您已登录'
        });
    }
    var mobile = req.body.mobile || "";
    var password = req.body.password || "";

    if (mobile == "") {
        res.json({ok: 0, info: "手机号不能为空"});
    }
    if (password == "") {
        res.json({ok: 0, info: "密码不能为空"});
    }

    db("select * from user where mobile=?", [mobile], function (results, fields) {
        var data = {
            serveTime: new Date().getTime()
        };
        if (results.length == 0) {
            data.ok = 0;
            data.info = '该手机号尚未注册';
        }
        else {
            var md5 = crypto.createHash("md5");
            var newPas = md5.update(password).digest("hex");
            if (results[0].password == newPas) {
                data.ok = 1;
                data.info = '登录成功';
                req.session.userid = results[0].id;
                //登录信息写入kookie
                res.cookie("user_id",{userid:results[0].id,password:newPas,last_login_time:new Date().getTime()},{maxAge:60000});
            }
            else {
                data.ok = 0;
                data.info = '密码错误';
            }
        }
        res.json(data);
    });

});

//registe
router.post('/registe', function (req, res, next) {
    var mobile = req.body.mobile || "";
    var email = req.body.email || "";
    var password = req.body.password || "";
    var name = req.body.name || "";
    var md5 = crypto.createHash("md5");
    var newPas = md5.update(password).digest("hex");

    if (name == "") {
        res.json({ok: 0, info: "用户名不能为空"});
    }
    if (mobile == "") {
        res.json({ok: 0, info: "手机号不能为空"});
    }
    if (password == "") {
        res.json({ok: 0, info: "密码不能为空"});
    }

    db("select * from user where name=?", [name], function (results, fields) {
        var data = {};
        if (results.length > 0) {
            data.ok = 0;
            data.info = '用户名被占用';
            res.json(data);
        }
        else {
            db("select * from user where mobile=?", [mobile], function (_results, _fields) {
                if (_results.length > 0) {
                    data.ok = 0;
                    data.info = '手机已被注册';
                    res.json(data);
                }
                else {
                    db("insert into user (name,mobile,email,password) VALUES(?,?,?,?)", [name, mobile, email, newPas], function (__results, __fields) {
                        data.ok = 1;
                        data.info = '注册成功'
                        res.json(data);
                    });
                }
            });
        }
    });

});

var serialize = function(name,val,opt){
    var pairs = [name + '=' +encodeURIComponent(val)];
    opt = opt || {};
    if(opt.maxAge) 　pairs.push('Max-Age=' + opt.maxAge);
    if(opt.domin) 　pairs.push('Domin=' + opt.domin);
    if(opt.path) 　pairs.push('Path=' + opt.path);
    if(opt.expires) 　pairs.push('Expires=' + opt.expires.toUTCString());
    if(opt.httpOnly) 　pairs.push('HttpOnly');
    if(opt.secure) 　pairs.push('Secure');
    return pairs.join(';');
}

module.exports = router;
