const express = require('express');
const { Article } = require('../../model/article')
const { User } = require('../../model/user')
const date = require('../../utils/date');
const index = express.Router();

index.use('/', async (req, res) => {
    const article = await Article.find({}, "publishDate title author content");
    const reg = /<\/?.+?\/?>/g;
    for (let i = 0; i < article.length; i++) {
        article[i] = article[i].toObject();
        //将转为html格式的博文去掉html标签然后取前100个字符作为摘要
        article[i].content = article[i].content || '';
        article[i].content = article[i].content.replace(reg, '').substr(0, 100);
        article[i].publishDate = date(article[i].publishDate, "yyyy-mm-dd HH:MM:ss");
        await User.findOne({ _id: article[i].author }, function (err, data) {
            article[i].uid = article[i].author;
            article[i].author = data.username;
        })
    }
    res.send(article);
})
module.exports = index;