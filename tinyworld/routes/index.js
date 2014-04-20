
<<<<<<< HEAD
var users = require('../routes/user');
=======
>>>>>>> database-edit

//This one was here by default. Not necessary
exports.index = function(req, res){
<<<<<<< HEAD
  res.render('index', { title: 'Welcome to Tiny World' });
};

<<<<<<< HEAD
exports.getProfiles = function (req, res) {
    res.render('profiles', {title: 'TinyWorld'});
};
=======
  res.render('index', { title: 'tinyWorld' });
};

exports.home = function(req,res){
	res.render('home', {title: 'Home'});
};

exports.toprankings = function(req, res){
	res.render('toprankings', {title: 'Top Rankings'});
};

exports.profile = function(req, res){
	var uname = 'huygaa11';
	users.getuser(uname, function(err, rows){
		if(err
			???
		else
			res.render('profile', {
				title   : 'Profile',
				fname   : rows.fname,
				lname   : rows.lname,
				gender  : rows.gender,
				age	    : rows.age,
				picture : rows.picture
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



// Login page. 
// 
// If new user, bring to new-user page
// else, bring to profile page

exports.login = function (req, res){
	var user = req.session.user;
	if(user){
		res.redirect('profile');
	}
	else{
		res.render('login', {
			title: 'tinyWorld',
			loginerr: req.flash('authorize'),
			registererr: req.flash('register')
		});
	}
};

exports.authorize = function(req, res){
	var username = req.body.user;
	var password = req.body.pass;
	if( !username || !password) {
		res.flash('authorize', "Must provide username and password");
		res.redirect('/');
	}
	else{
		users.validate(username, password, function(err, user){
			if(err){
				req.flash('authorize', err);
				res.redirect('/');
			}
			else{
				req.session.user = user;
				res.redirect('profile');
			}
		});
	}
};

exports.register = function(req, res){
	var username = req.body.user;
	var password = req.body.pass;
	if (!username || !password) {
    	req.flash('register', 'Must provide username and password');
    	res.redirect('/');
  	}
  	else{
  		users.exists(username , function (exists){
  			//People may have same name, so we'll allow duplicates
  			users.add(username, password, function(err, user){
  				if(err){
  					req.flash('register', 'There was a problem with registration. Please try again!');
  					res.redirect('/');
  				}
  				else{
  					req.session.user = user;
  					res.redirect('profile');
  				}
  			});
  		});
  	}
};

>>>>>>> d66248a289f9bda7ac910c135e17ac9f695f62f4
=======
>>>>>>> database-edit
