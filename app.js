
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , engines= require('consolidate')
  , path = require('path');
var hbs = require('hbs');
var app = express();

var net = require('net');
var bodyParser = require('body-parser');




app.set('ip', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set('views', __dirname + '/views');
app.engine('html', hbs.__express);
app.set('view engine', 'html');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use (express.urlencoded ());
app.use (express.multipart ());




app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.write('you posted:\n');
  res.end(JSON.stringify(req.body, null, 2));
});




// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}



app.get('/',routes.test);
app.post('/',routes.test1);


http.createServer(app,function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/json;charset=UTF-8'});
    res.end('Hello World\n');
}).listen(app.get('port'), app.get('ip'));


