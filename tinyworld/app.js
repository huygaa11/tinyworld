
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();
var flash = require('connect-flash');
// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
// TDR ADDED:
// This is where we add the middleware to the express environment
// for flash support for redirects:
app.use(flash());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


//Route Views
app.get('/', routes.home); //no users set up yet, so won't load
app.get('/users', user.list);
app.get('/profile/:user', routes.getProfile); 
app.get('/toprankings', routes.toprankings);
app.get('/profile', routes.profile);
app.get('/home', routes.home);
app.get('/challenge', routes.challenge);
app.get('/forgotpw', routes.forgotpw);
app.get('/settings', routes.settings);
app.post('/register', routes.register);
app.get('/registration', routes.seeRegistration);
app.get('/logout', routes.logout);
app.post('/authorize', routes.authorize);
app.get('/arena/:id', routes.arena);
app.post('/arena/post', routes.post);
app.post('/makeChallenge', routes.makeChallenge);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
