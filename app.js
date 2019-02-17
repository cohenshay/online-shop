//packeges
const createError = require('http-errors');
const fileUpload = require('express-fileupload');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const jwtAuthenticator = require('./helpers/jwtAuthenticator');
const multer = require('multer');
const crypto = require('crypto');
const mime = require('mime');
const moment=require('./helpers/moment');

//routes
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const roomRouter = require('./routes/room');
const messageRouter = require('./routes/message');
const shopRouter = require('./routes/shop');
const http = require('http');


const app = express();

const server = http.createServer(app);
const io = require('socket.io').listen(server);
require('./handlers/io')(io);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//middlewares
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cookie, authorization");  
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  next();
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, path.resolve(__dirname, `app/public/images/items/`));
  },
  filename: function(req, file, callback) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      callback(null,file.originalname.substring(0,file.originalname.indexOf(".")) +"_"+moment(new Date()).format("DD_MM_YYYY") + '.' + mime.getExtension(file.mimetype));
    });
  }
});
app.use('/api/shop/addItem',multer({dest: path.join(__dirname, 'app/public/images/items/'),storage:storage}).any());

//private routes (needs auth)
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/api/user', jwtAuthenticator,userRouter);
app.use('/api/room', jwtAuthenticator,roomRouter);
app.use('/api/message', jwtAuthenticator,messageRouter);
app.use('/chat',jwtAuthenticator);
//public routes
app.use('/api/shop/', shopRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

server.listen(5000);

module.exports = app;
