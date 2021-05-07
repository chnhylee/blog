const express = require('express');
const router = express.Router();
const {validateToken} = require('../../../utils/validate');
const info = require('../../../utils/info');
const {Article} = require('../../../model/article');
router.use('/',async function(req,res){
    console.log(req.body);
    let result = await validateToken(req,res);
    if(result.tokenKey!==undefined&&result.tokenKey){
        //删除操作
        let article = await Article.findOneAndDelete({_id:req.body.id})
        console.log(article)
        res.send(info.success.article.delete);
    }else{
        res.send(info.error.article.delete);
    }
})
module.exports = router;