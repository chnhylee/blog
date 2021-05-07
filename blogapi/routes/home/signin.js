const express = require('express');
const signin = express.Router();
const Token = require('../../model/jwt');
const {User} = require('../../model/user');
const bcrypt = require('bcrypt');
const info = require('../../utils/info');
signin.use('/',async function(req,res){
    console.log(req.body);
    let user = await User.findOne({email:req.body.email});
    if(user){
        let pwd = await bcrypt.compare(req.body.password,user.password);

        //数据库中有该用户，且该用户的密码输入正确
        if(pwd){
            res.send({
                info:info.success.user.signin,
                token:Token.en(req.body.email),
                username:user.username,
                uid:user._id,
                role:user.role
            });
        }else{
            res.send({
                info:info.error.user.signin
            });
        }
    }else{
        res.send({
            info:info.error.user.signin
        });
    }

})
module.exports = signin;