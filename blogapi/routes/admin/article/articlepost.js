const express = require('express');
const router = express.Router();
const {Article} = require('../../../model/article');
const Token = require('../../../model/jwt');
const info = require('../../../utils/info')
const {validateToken} = require('../../../utils/validate');
router.use('/',async function(req,res){
    let result = await validateToken(req,res);
    if(result.tokenKey!==undefined&&result.tokenKey){
        await Article.create({
            author:req.body.uid,
            title:req.body.title,
            contentOri:req.body.contentOri,
            content:req.body.contentAbstract,
            publishDate:new Date()
        })
        res.send(info.success.article.upload);
    }else{
        res.send(info.error.article.upload);
    }
})
module.exports = router;