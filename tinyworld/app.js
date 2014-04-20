
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


//Route Views
app.get('/', routes.index); //no users set up yet, so won't load
app.get('/users', user.list);
<<<<<<< HEAD
<<<<<<< HEAD
app.get('/profiles', routes.getProfiles);
=======
app.get('/toprankings', routes.toprankings);
app.get('/profile', routes.profile);
app.get('/home', routes.home);
app.get('/challenge', routes.challenge);
app.get('/forgotpw', routes.forgotpw);
app.get('/settings', routes.settings);

>>>>>>> d66248a289f9bda7ac910c135e17ac9f695f62f4
=======

>>>>>>> database-edit

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
