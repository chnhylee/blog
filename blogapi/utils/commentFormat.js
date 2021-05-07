const {Article} = require('../model/article')
const {User} = require('../model/user')
const {Comment} = require('../model/comment')
const date = require('./date');
const commentFormat = async function(OBJ){
    for (let i=0;i<OBJ.length;i++){
        OBJ[i] = OBJ[i].toObject();
        OBJ[i].time = date(OBJ[i].time,"yyyy-mm-dd HH:MM:ss");
        await Article.findOne({_id:OBJ[i].aid},"title",function(err,data){
            if(data){
                OBJ[i].aid = data.title
            }else{
                OBJ[i].aid='文章已被作者或管理员删除'
            }
            console.log(data)
        });
        await User.findOne({_id:OBJ[i].uid},"email",function(err,data){
            if(data){
                OBJ[i].uid = data.email
            }else{
                OBJ[i].uid = ''
            }
        })
    }
    return OBJ
}
module.exports = commentFormat;