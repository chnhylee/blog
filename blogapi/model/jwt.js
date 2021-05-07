const jwt = require('jsonwebtoken');
const info = require('../utils/info')
const success = info.success.token;
const error = info.error.token;
Token = {
    en(str){
        return jwt.sign(str,'lhydeqianzheng');
    },
    de(token){
        try{
            let tokenKey = jwt.verify(token,'lhydeqianzheng');
            return{
                success,
                tokenKey
            }
        }catch {
            return {
                error
            }
        }
    }
}
module.exports = Token;