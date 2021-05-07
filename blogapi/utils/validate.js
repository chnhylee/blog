const token = require('../model/jwt');
const {User} = require('../model/user');
const info = require('../utils/info');
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types;
//用户token检验 function(req,res){return bool}
const validateToken = async function(req,res){
    let isValidate = token.de(req.body.token);
    var user = {}
    //如果用户id 非ObjectId类型，则直接返回错误
    if(!ObjectId.isValid(req.body.uid)){
        return res.send(info.error.token);
    }
    await User.findOne({_id:req.body.uid},"email",function (err,data) {
        console.log(data)
        if(data){
            user._id = data._id;
            user.email=data.email;
        }else{
            return info.error.token;
        }
    })
    if(isValidate.tokenKey&&user.email==isValidate.tokenKey){
        return isValidate
    }else{
        return res.send(info.error.token);
    }
}
//注册检验 function(req,res){return bool}
const validateSignup = async function(req,res){

    let user = await User.findOne({email:req.body.email},"email");

    if(user){
        return false
    }else{

        return true

    }

}
//检查用户权限，输入token，判断用户是管理员还是普通用户

module.exports = {
    validateToken,
    validateSignup
}