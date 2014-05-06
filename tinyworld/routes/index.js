
var users = require('../lib/users');
var challenges = require('../lib/challenges');
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

exports.post = function (req, res) {
	var user = req.session.user;
	var chalid = req.session.chalid;
	if (!user) {
		res.redirect('/');
	}
	else {
		var post = req.body.comment;
		console.log(post);
		if (!post) {
			res.redirect('/arena/' + chalid);
		}
		else {
			challenges.addPosts(user, post, chalid);
			res.redirect('/arena/' + chalid);
		}
	}
};

exports.makeChallenge = function(req, res){
	var user = req.session.user;
	var title = req.body.title;
	var description = req.body.description;


	if(!user) {
		res.redirect('/');
	}
	else {
		if (!description || !title)
			res.redirect('/challenge');
		else {
			challenges.addChallenges(title, description, user);
			res.redirect('/challenge');
		}
	}
};

exports.arena = function(req, res){
	var user = req.session.user;
	var id = req.params.id;
	req.session.chalid = id;
	challenges.getArena(id,function (err, challenge){
		challenges.getPosts(id, function (err, posts){
			res.render('arena', {
				title: 'Arena',
				challenge : challenge,
				posts : posts
			});
		});
	});
};

exports.challenge = function(req, res){
	var user = req.session.user;
	challenges.getChallenges(function (err, challenges){
		res.render('challenges', {
			user : user,
			challengeList : challenges
		});
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

exports.register = function (req, res) {
	var username = req.body.user;
	var password = req.body.pass;
	var fname = req.body.fname;
	var lname = req.body.lname;
	var age = req.body.age;
	var bio = req.body.bio;
	// var gender = req.body.gender;
	// var email = req.body.email;
	if (!username || !password || !fname || !lname || !age || !bio) {
		req.flash('register', 'Must fill in all fields');
		res.redirect('/registration');
	}
	else {

		users.exists(username, function (exists) {
			if (exists) {
				req.flash('register', 'Username already exists. Pick another!');
				res.redirect('/registration');
			}
			else {

				users.add(username, fname, lname, age, password, bio, function (err, user) { //user is username

						if (err) {
							req.flash('register', 'Problem with registration. Try again.');
						}
						else {
							req.session.user = user;
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
		res.redirect('/');
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

exports.seeRegistration = function (req, res){
	res.render('registration', {
				registererr: req.flash('register') //remember to add this
			});
};

exports.getProfile = function(req, res){ //function used to get to another user's profile, gets user id from
	var username = req.params.user;
	users.getuser(username, function (err, user){
		if(err)
			console.log("error");
		else {
			res.render('profile', { title: 'Profile',
				rows : user
			});
		}
	});
}; 
