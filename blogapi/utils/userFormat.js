const {User} = require('../model/user')
const userFormat = async function(OBJ){
    for(let i=0;i<OBJ.length;i++){
        OBJ[i] = OBJ[i].toObject();
        await User.findOne({_id:OBJ[i]._id},"role state",function(err,data){
            if(data.role==='admin'){
                OBJ[i].role='管理员'
            }else{
                OBJ[i].role='普通用户'
            }
            if(data.state===0){
                OBJ[i].state='启用'
            }else{
                OBJ[i].state='封禁'
            }
        });
    }
    return OBJ;
}
module.exports = userFormat;