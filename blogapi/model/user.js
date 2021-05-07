const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true//admin 超级管理员  user 普通用户
    },
    state: {
        type: Number,
        default: 0//0:启用 1:禁用
    }
});
// 创建集合
const User = mongoose.model('User', userSchema);

async function createUser() {
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash('123456', salt);
    const user = await User.create({
        username: 'aeromu3',
        email: 'aeromu3@qq.com',
        password: pass,
        role: 'admin',
        state: 0
    })
}
// createUser();

// 验证用户信息
const validateUser = user => {
    // 定义对象的验证规则
    const schema = {
        username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合规则')),
        email: Joi.string().email().error(new Error('邮箱格式不符合要求')),
        password: Joi.string().regex(/^[a-zA-z0-9]{3,30}$/).required().error(new Error('密码格式不符合要求')),
        role: Joi.string().valid('user', 'admin').required().error(new Error('角色值非法')),
        state: Joi.number().valid(0, 1).require.error(new Error('状态值非法'))
    };
    // 验证
    return Joi.validate(user, schema);
}



module.exports = {
    User,
    validateUser,
    createUser
}