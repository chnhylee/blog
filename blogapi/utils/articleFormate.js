const {User} = require('../model/user')
const date = require('./date')
const reg = /<\/?.+?\/?>/g;
const articleFormat = async function(OBJ){
    for(let i=0;i<OBJ.length;i++){
        OBJ[i] = OBJ[i].toObject();
        OBJ[i].content = OBJ[i].content.replace(reg,'').substr(0,100);
        OBJ[i].publishDate = date(OBJ[i].publishDate,"yyyy-mm-dd HH:MM:ss");
        await User.findOne({_id:OBJ[i].author},"username",function(err,data){
            OBJ[i].author = data.username;
        });
    }
    return OBJ;
}
module.exports = articleFormat;