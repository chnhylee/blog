var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



var app = express();
require('./model/connect')//连接数据库
//配置跨域
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
})
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//前台数据接口
app.use('/home/index', require('./routes/home/index'));
app.use('/home/detail', require('./routes/home/detail'));
app.use('/home/commentlist', require('./routes/home/commentlist'));
app.use('/home/commentpost', require('./routes/home/commentpost'));
app.use('/home/signup', require('./routes/home/signup'));
app.use('/home/signin', require('./routes/home/signin'));
//后台数据接口
app.use('/admin/articlepost',require('./routes/admin/article/articlepost'))
app.use('/admin/articlelist',require('./routes/admin/article/articlelist'))
app.use('/admin/articleedit',require('./routes/admin/article/articleedit'))
app.use('/admin/articledrop',require('./routes/admin/article/articledrop'))
app.use('/admin/userlist',require('./routes/admin/user/userlist'))
app.use('/admin/useredit',require('./routes/admin/user/useredit'))
app.use('/admin/userdrop',require('./routes/admin/user/userdrop'))
app.use('/admin/commentlist',require('./routes/admin/comment/commentlist'))
app.use('/admin/commentdrop',require('./routes/admin/comment/commentdrop'))
app.use('/admin/signup',require('./routes/admin/user/signup'))
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('404 Not Found');
});

module.exports = app;
