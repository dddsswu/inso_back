var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var loginRouter= require('./routes/login');
var msgRouter=require('./routes/msgbox');
var blogRouter=require('./routes/postBlog.js')

var app = express();
var bodyParser = require('body-parser');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var cors=require('cors')
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
//扩大接受请求的大小
app.use(express.urlencoded({ extended: false,limit:'20480kb',parameterLimit:'5242880' }));
app.use(cookieParser());
//允许静态访问
app.use('/public',express.static(path.join(__dirname, 'public')));


// app.use(express.urlencoded({extended:true,limit:'4096kb',parameterLimit:'4096'}))

app.use('/', indexRouter);

// app.use('/login',(req,res,next)=>{
//   query('select * from sql_test_01',function(res){
//     console.log(res)
//   })
// })
app.use('/login',loginRouter)
app.use('/msgbox',msgRouter)
app.use('/postblog',blogRouter)

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
