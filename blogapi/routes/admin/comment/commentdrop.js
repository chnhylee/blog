const express = require('express');
const router = express.Router();
const {validateToken} = require('../../../utils/validate');
const info = require('../../../utils/info');
const {Comment} = require('../../../model/comment');
router.use('/',async function(req,res){
    let result = await validateToken(req,res);
    if(result.tokenKey!==undefined&&result.tokenKey){
        //删除操作
        let comment = await Comment.findOneAndDelete({_id:req.body.id})
        res.send(info.success.comment.delete);
    }else{
        res.send(info.error.comment.delete);
    }
})
module.exports = router;