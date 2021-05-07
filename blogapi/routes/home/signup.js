const express = require('express');
const signup = express.Router();
const bcrypt = require('bcrypt');
const {User} = require('../../model/user')
const {validateSignup} = require('../../utils/validate')
const info = require('../../utils/info');
signup.post('/',async function (req,res) {
    console.log(req.body);
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash(req.body.password,salt);
    if(await validateSignup(req,res)){
        await User.create({
            email:req.body.email,
            username:req.body.username,
            password:pass,
            role:'user',
            state:'0'
        })
        res.send(info.success.user.signup);
    }else{
        res.send(info.error.user.signup);
    }
})
module.exports = signup;