var express = require('express');
var router = express.Router();
var db = require('../config/mysql_pool');

//获取文章详情，"/articles?id=1"
router.get('/', function (req, res, next) {
    var id = req.query.id;
    db('select * from articles where id=?',[id], function (results,fields) {
        if(results.length > 0){
            res.json(results[0]);
        }
        else {
            res.json("");
        }
    });
});

//获取文章分页列表
router.get('/lists', function (req, res, next) {
    var page = req.query.page || 1;
    var pageSize = req.query.pageSize || 10;
    getArticlePager(page, pageSize, function (results) {
        for(var i = 0,len = results.length; i < len; i++){
           var mark = 0;
            console.log(results[i]);
           db('select * from user where id=?',[results[i].id], function (_res, fields) {
                results[i].info={
                    id:_res.id,
                    name:_res.name,
                    avatar:_res.avatar,
                }
               mark++;
               if(i+1==results.length && mark == 2){
                    res.json(results);
               }
           });
            db('select * from user_cat where id=?',[results[i].cat_id], function (_res, fields) {
                results[i].cat_name=_res.name;
                mark++;
                if(i+1==len && mark == 2){
                    res.json(results);
                }
            })
        }
    });
});

//根据分类id获取文章列表
//todo

//新建文章
router.post('/new', function (req, res, next) {
    if(!req.session.userid){
        res.json({
            ok:0,
            info:'请先登录'
        });
    }
    var title = req.body.title;
    var content = req.body.content || "";
    var cat_id = req.body.cat_id;
    var author_id=req.session.userid;
    db("insert into articles (title,content,cat_id,create_time,author_id) VALUES(?,?,?,?,?)",[title,content,cat_id,Date.now(),author_id], function (results, fields) {
        res.json({ok:1,info:'新建成功'});
    });
})
//修改文章
router.post('/save',function(req,res,next){
    if(!req.session.userid){
        res.json({
            ok:0,
            info:'请先登录'
        });
    }
    var title = req.body.title || '';
    var content = req.body.content || '';
    var id = req.body.id;
    var text_num = req.body.text_num || 0;
    //去标签，去实体标签
    var abstract = content;
    abstract = abstract.replace(/<[img]?[^>]*>/ig, '');//去标签
    abstract = abstract.replace(/\s/g, '');//去空格
    //提取图片做封面
    var img=content.match(/<img[^>]*>/i)[0];
    db("update articles set title=?,content=?,text_num=?,abstract=?,img=? where id = ?",[title,content,text_num,abstract,img,id], function (results, fields) {
        res.send({ok:1,info:'保存成功'});
    });
});
//发布文章
router.post('/publish', function (req, res, next) {
    if(!req.session.userid){
        res.json({
            ok:0,
            info:'请先登录'
        });
    }
    var publish_status = req.body.publish_status || 0;
    var id = req.body.id;
    if(publish_status == 1 && id > 0){
        db("UPDATE articles SET publish_status = ?,publish_time = ? WHERE id = ? ",[publish_status,new Date().getTime(),id], function (results, fields) {
            res.json({ok:1,info:'发布成功'});
        });
    }
});
//删除,逻辑删除（放入回收站）或者物理删除
router.post('/delete', function (req, res, next) {
    var id = req.body.id;
    var _delete = req.body.delete || 0;
    db('delete from articles where id=?')
    //todo
});
//从回收站恢复文章
//todo
//获取回收站文章列表
//todo





//分页查询方法
function getArticlePager(currentPage, pageSize, func) {
    if (currentPage <= 0 || !currentPage) currentPage = 1;
    var start = (currentPage - 1) * pageSize;
    var end = start + pageSize;
    db("select * from articles where is_delete=0 order by create_time desc limit ?,?", [start, end], function (results, fields) {
        func(results);
    });
}

module.exports = router;