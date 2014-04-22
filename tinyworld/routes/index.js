
var users = require('../lib/users');

//This one was here by default. Not necessary
exports.index = function(req, res){
  res.render('index', { title: 'Welcome to Tiny World' });
};

exports.home = function(req,res){
	res.render('home', {title: 'Home'});
};

exports.toprankings = function(req, res){
	users.getAllUsers(function(err, allusers) {
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
	var uname = 'huygaa11';
	users.getuser(uname, function(err, user){
		if(err)
			console.log("error");	
		else
			res.render('profile', {
				user : user,
				title   : 'Profile',
				fname   : user.fname,
				lname   : user.lname,
				gender  : user.gender,
				age	    : user.age,
				

				picture : user.picture
			});
	});
};

exports.settings = function(req, res){

};

exports.challenge = function(req, res){
	//Don't have a page yet
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

		users.logout(user);
		req.session.destroy(function () {
			res.redirect('/home');
		});
	}
};

exports.register = function (req, res) {
	console.log(req.body);
	var username = req.body.email;
	var password = req.body.pass;
	var fname = req.body.fname;
	var lname = req.body.lname;
	var age = 18;
	var gender = 'Female';
	//var age = req.body.age;
	//var gender = req.body.gender;
	//var email = req.body.email;
	if (!username || !password || !fname || !lname) {
		//req.flash('registration', 'Must provide all the fields');
		res.redirect('/registration');
	}
	else {

		users.exists(username, function (exists) {
			if (exists) {
			//	req.flash('register', 'Username already exists. Pick another!');
				console.log('here');
				res.redirect('/registration');
			}
			else {
				users.add(username, fname, lname, age, password, function (err, user) {

						if (err) {
							console.log('error');
						//	req.flash('register', 'Problem with registration. Try again.');
						}
						else {
							console.log(user);
							//req.session.user = gotuser;	
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
	res.redirect('/');
			}
			else {
	req.session.user = user;
	res.redirect('/profile');
			}
		});
	}
};





exports.showRegistration = function (req, res){
	res.render('registration');
}
