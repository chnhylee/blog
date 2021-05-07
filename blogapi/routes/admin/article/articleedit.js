const express = require('express');
const router = express.Router();
const {Article} = require('../../../model/article');
const Token = require('../../../model/jwt');
const info = require('../../../utils/info')
const {validateToken} = require('../../../utils/validate');
router.use('/',async function(req,res){
    console.log(req.body);
    let isValidate = await validateToken(req,res);
    if(isValidate.tokenKey){
        await Article.findOneAndUpdate({aid:req.aid},{
            title:req.body.title,
            author:req.body.uid,
            contentOri:req.body.contentOri,
            content:req.body.contentAbstract,
            publishDate:new Date()
        })
        res.send(info.success.article.update)
    }else{
        res.send(info.error.article.update);
    }
})
module.exports = router;