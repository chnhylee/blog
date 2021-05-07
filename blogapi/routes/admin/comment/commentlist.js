const express = require('express');
const router = express.Router();
const {validateToken} = require('../../../utils/validate');
const {User} = require('../../../model/user')
const {Comment} = require('../../../model/comment')
const commentFormat = require('../../../utils/commentFormat')
const info = require('../../../utils/info')
router.use('/',async function(req,res){
    let result = await validateToken(req,res);
    if(result.tokenKey!==undefined&&result.tokenKey){
        let user = await User.findOne({_id:req.body.uid},"role");
        if(user.role=='admin'){
            let comment =  await Comment.find();
            res.send(await commentFormat(comment));
        }else{
            let comment = await Comment.findOne({uid:req.body.uid});
            comment = [comment];
            res.send(await commentFormat(comment));
        }
    }else{

    }

})
module.exports = router;