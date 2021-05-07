const express = require('express');
const router = express.Router();
const {Comment} = require('../../model/comment');
const {validateToken} = require('../../utils/validate');
const info = require('../../utils/info')
router.use('/',async (req,res)=>{
    console.log(req.body);
    let result = await validateToken(req,res);
    if(result.tokenKey!==undefined&&result.tokenKey){
        await Comment.create({
            uid:req.body.uid,
            aid:req.body.aid,
            content:req.body.content,
            time:new Date()
        })
        res.send(info.success.comment.post);
    }


})
module.exports = router;