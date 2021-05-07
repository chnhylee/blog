const express = require('express');
const router = express.Router();
const {validateToken} = require('../../../utils/validate');
const {User} = require('../../../model/user')
const info = require('../../../utils/info')
const userFormat = require('../../../utils/userFormat')
router.use('/',async function(req,res){
    let result = await validateToken(req,res);
    if(result.tokenKey!==undefined&&result.tokenKey){

        let user = await User.findOne({_id:req.body.uid},"role");
        if(user.role==='admin'){
            let userAll = await User.find({},"state role email username");
            res.send(await userFormat(userAll));
        }else{
            console.log('1')
            res.send(info.error.user.list);
        }
    }
})
module.exports = router;