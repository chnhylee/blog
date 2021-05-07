const express = require('express');
const commentList = express.Router();
const {Comment} = require('../../model/comment')
const {User} = require('../../model/user')
const date = require('../../utils/date')
const info = require('../../utils/info')
commentList.post('/',async (req,res)=> {
    let aid = req.body.id;
    console.log(aid)
    const commentlist = await Comment.find({aid:aid});
    console.log(commentlist)
    if(commentlist.length>0){
        for (let i=0;i<commentlist.length;i++){
            commentlist[i] = commentlist[i].toObject();
            commentlist[i].time = date(commentlist[i].time,"yyyy-mm-dd HH:MM:ss");
            await User.findOne({_id:commentlist[i].uid},"username",function(err,data){
                commentlist[i].uid=data.username;
            })
        }
        res.send(commentlist);
    }else{
        res.send(info.error.comment.query);
    }

});
module.exports = commentList;