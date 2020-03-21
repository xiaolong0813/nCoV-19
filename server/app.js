var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors')

// 路由
var dataRouter = require('./routes/data');
// var qaRouter = require('./routes/qa');
var usersRouter = require('./routes/users');

var app = express();

app.use(cors())   // 使用cors跨域

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// 注册中间件
app.use(logger('dev'));
app.use(express.json());  // 获取post的json格式数据
app.use(express.urlencoded({ extended: false }));   // 获取post的urlencoded格式数据
app.use(cookieParser());  // 解析cookie
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/data', dataRouter);
// app.use('/api/qa', qaRouter);
app.use('/users', usersRouter);

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
  res.render('error');
});

module.exports = app;
