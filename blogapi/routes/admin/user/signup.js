const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {User} = require('../../../model/user');
const Token = require('../../../model/jwt');
const info = require('../../../utils/info')
const {validateToken} = require('../../../utils/validate');
router.use('/',async function(req,res){
    let result = await validateToken(req,res);
    if(result.tokenKey!=undefined&&result.tokenKey){
        let user = await User.findOne({_id:req.body.uid},"role");
        let signupUser = await User.findOne({email:req.body.email});
        if(user.role=='admin'){//如果当前是管理员用户登录
            if(signupUser){//如果该邮箱已经注册
                return res.send(info.error.user.signup);
            }else{//如果该邮箱未注册
                await User.create({
                    email:req.body.email,
                    password:await bcrypt.hash(req.body.password,await bcrypt.genSalt(10)),
                    username:req.body.username,
                    role:req.body.role,
                    state:'0'
                })
                if(req.body.role=='admin'){
                    res.send(info.success.user.signupAdmin);
                }else{
                    res.send(info.success.user.signup);
                }
            }
        }else{//如果是普通用户登录注册
            if(signupUser){//如果该邮箱已经注册
                return res.send(info.error.user.signup);
            }else{//如果该邮箱未注册
                await User.create({
                    email:req.body.email,
                    password:await bcrypt.hash(req.body.password,await bcrypt.genSalt(10)),
                    username:req.body.username,
                    role:'user',
                    state:'0'
                })
                res.send(info.success.user.signup);
            }
        }
    }else{

    }




})
module.exports = router;