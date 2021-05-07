const express = require('express');
const detail = express.Router();
const {Article} = require('../../model/article');
const {User} = require('../../model/user');

const date = require('../../utils/date')
const info = require('../../utils/info')
detail.use('/',async (req,res)=>{
    console.log(req.body);
    let article = await Article.findOne({_id:req.body.id},"publishDate title author contentOri");
    console.log(article)
    if (article){
        article = article.toObject();
        article.publishDate = article.publishDate = date(article.publishDate,"yyyy-mm-dd HH:MM:ss");
        await User.findOne({_id:article.author},function(err,data){
            article.author = data.username;
        })
        res.send(article);
    }else{
        res.send(info.error.article.query);
    }

});
module.exports = detail;