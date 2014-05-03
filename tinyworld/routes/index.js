var challenges = require('../lib/challenges');
var users = require('../lib/users');

//This one was here by default. Not necessary
exports.index = function(req, res){
  res.render('index', { title: 'Welcome to Tiny World' });
};

exports.home = function(req,res){
	var user = req.session.user;
	if (user)
		res.redirect('/profile');
	else {
		res.render('home', {title: 'Home'});

	}
};

exports.toprankings = function(req, res){
	users.getAllUsers(function(err, allusers){
		//Check for the top people here? or in the ejs... hmmm
		if(err)
			console.log('error');
		else{
			res.render('toprankings', {
				allusers : allusers
			});
		}
	});
};

exports.profile = function(req, res){
	var user = req.session.user;

	users.getuser(user, function (err, user){
		if(err)
			console.log("error");
		else {
			res.render('profile', { title: 'Profile',
				rows : user
			});
		}
	});
};

exports.challenge = function(req, res){
	var user = req.sesion.user;
	res.render('challenges', {
		user : user,
		challenges : user.challenges
	});
	
};

exports.forgotpw = function(req, res){
	res.render('forgotpw', {title: 'Forgot password'});
};

exports.logout = function (req, res) {
	// Grab the user object from the session:
	var user = req.session.user;

	// If this is not a logged in user we redirect:
	if (!user) {
		res.redirect('/');
	}
	else {

		req.session.destroy(function () {
			res.redirect('/home');
		});
	}
};

exports.settings = function (req, res) {
	res.render('settings');
};

exports.logout = function (req, res) {
	// Grab the user object from the session:
	var user = req.session.user;

	// If this is not a logged in user we redirect:
	if (!user) {
		res.redirect('/');
	}
	else {

		users.logout(user);
		req.session.destroy(function () {
			res.redirect('/home');
		});
	}
};

exports.register = function (req, res) {
	var username = req.body.user;
	var password = req.body.pass;
	var fname = req.body.fname;
	var lname = req.body.lname;
	var age = req.body.age;
	// var gender = req.body.gender;
	// var email = req.body.email;
	if (!username || !password) {
		req.flash('register', 'Must provide username and password');
		res.redirect('/seeRegistration');
	}
	else {

		users.exists(username, function (exists) {
			if (exists) {
				req.flash('register', 'Username already exists. Pick another!');
				res.redirect('/seeRegistration');
			}
			else {

				users.add(username, fname, lname, age, password, function (err, user) { //username

						if (err) {
							req.flash('register', 'Problem with registration. Try again.');
						}
						else {
							req.session.user = user;
							console.log(user);
							res.redirect('/profile');
						}
				});
			}
		});
	}
};

exports.authorize = function (req, res) {
	var username = req.body.user;
	var password = req.body.pass;
	if (!username || !password) {
		req.flash('authorize', 'Must provide username and password');
		res.redirect('/home');
	}
	else {
		users.validate(username, password, function (err, user) {
			if (err) {
	req.flash('authorize', err);
	res.redirect('/home');
			}
			else {
	req.session.user = user;
	res.redirect('/profile');
			}
		});
	}
};

exports.seeRegistration = function (req, res){
	res.render('registration', {
				registererr: req.flash('register') //remember to add this
			});
};
