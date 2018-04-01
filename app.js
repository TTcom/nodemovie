 
var express=require('express')
var path=require('path');
var port = process.env.PORT || 3000;
var app = express();

app.set('views','./app/views/pages')
app.set('view engine','jade');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var mongoose=require('mongoose')
var mongoStore=require('connect-mongo')(session)
var logger = require('morgan');
var dburl='mongodb://127.0.0.1:27017/test';
mongoose.connect(dburl);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '1mb'}));
//app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname,'public')))
app.use(cookieParser())
app.use(session({

  secret: 'peiqi',
  store:new mongoStore({
  	url:dburl,
  	collection:'sessions'
  }),
  resave: false,

  saveUninitialized: true

}))

if('development' === app.get('env')){
	app.set('showStackError',true);
	app.use(logger(':method:url:status'))
	app.locals.pretty=true;
	mongoose.set('debug',true)
}

require('./config/routes')(app)

app.locals.moment=require('moment');

app.listen(port)

console.log('movie started on port' +port)