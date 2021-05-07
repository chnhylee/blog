const express = require('express');
const router = express.Router();
const Token = require('../../../model/jwt');
const {User} = require('../../../model/user');
const {Article} = require('../../../model/article');
const date = require('../../../utils/date');
const articleFormat = require('../../../utils/articleFormate')
router.use('/',async function(req,res){
    let result = Token.de(req.body.token);
    if(result.tokenKey!==undefined&&result.tokenKey){//Token检验通过，给用户返回文章列表
        console.log(result.tokenKey);//显示当前用户名
        //如果用户身份是管理员，刚显示所有文章
        let user = await User.findOne({email:result.tokenKey},"role");
        console.log(user);
        if(user.role=='admin'){
            console.log(user);
            let article = await Article.find({},"publishDate author title content");
            res.send(await articleFormat(article));
        }else{
            console.log(user)
            let article = await Article.find({author:user._id},"publishDate author title content");
            res.send(await articleFormat(article));
        }
    }else{
        res.send()
    }
})
module.exports = router;