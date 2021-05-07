const mongoose = require('mongoose');
const articleSchema = new mongoose.Schema({
    title:{
        type:String,
        maxlength:20,
        minlength:1,
        require:[true,'请输入标题']
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'请输入作者名']
    },
    publishDate:{
        type:Date,
        default:Date.now()
    },
    cover:{
        type:String,
        default:null
    },
    content:{
        type:String
    },
    contentOri:{
        type:String
    }
})
const Article = mongoose.model('Article',articleSchema);

module.exports = {
    Article
}