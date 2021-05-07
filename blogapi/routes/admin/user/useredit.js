const express = require('express');
const {validateToken} = require('../../../utils/validate');
const info = require('../../../utils/info')
const {User} = require('../../../model/user');
const bcrypt = require('bcrypt');
const router = express.Router();
router.use('/',async function(req,res){
    console.log(req.body);
    let result = await validateToken(req,res);
    if(result.tokenKey!=undefined&&result.tokenKey){
        let user = await User.findOne({_id:req.body.uid},"email role");
        if(user.role=='admin'){
            await User.findOneAndUpdate({_id:req.body.editId},{
                username:req.body.username,
                password:await bcrypt.hash(req.body.password,await bcrypt.genSalt(10)),
                role:req.body.role,
                state:req.body.state
            })
            res.send(info.success.user.update);
        }
    }else{
        res.send(info.error.user.update)
    }
})
module.exports = router;