var pg = require('pg');

var connString = 'postgres://vagrant:vagrant@localhost/vagrant';

var conn = connString;


exports.getArena = function(challengeID, callback){
	pg.connect(conn, function(err, client, done){ // connecting to the db
		if(err){ // if cannot connect to the db throw error, bad practice!! send callback!
			console.log("error in connection to database");
			throw err;
		}

		var qry ='select * from challenges where chalid=$1'; // used for not making the client.query too big.
		client.query(qry, [challengeID], function (err, result) { //selecting from the db
			done(); // connection done. 
			if(err){ // if cannot select, throw error. bad practice. send callback to user!!!
				console.log("call to database did not work correctly");
				callback(err);
			}
			else {
				callback(undefined, result.rows);
			}
		});
	});
};

exports.getChallenges = function(cb){
	pg.connect(conn, function(err, client, done){ // connecting to the db
		if(err){ // if cannot connect to the db throw error, bad practice!! send callback!
			console.log("error in connection to database");
			throw err;
		}

		var qry ='select * from challenges order by chalid DESC';
		client.query(qry, function (err, result) { //selecting from the db
			done(); // connection done. 
			if(err){ // if cannot select, throw error. bad practice. send callback to user!!!
				console.log("call to database did not work correctly");
				cb(err);
			}
			else {
				cb(undefined, result.rows);
			}
		});
	});
};


exports.addPosts = function(username, post, challengeID){
	pg.connect(conn, function(err, client, done){
		if(err){
			console.log("error in connection to database");
			throw err;
		}

		var qry = 'insert into posts (username, post, chalid) values ($1, $2, $3);';
		client.query(qry, [username, post, challengeID], function (err, result) {
			done();
			if(err){
				console.log("call to database did not work correctly");
			}

		});
	});
};

exports.getPosts = function(challengeID, cb){
	pg.connect(conn, function(err, client, done){
		if(err){
			console.log("error in connection to database");
			throw err;
		}

		var qry = 'select * from posts where chalid=$1 order by chalid DESC';
		client.query(qry, [challengeID], function (err, result) {
			done();
			if(err){
				console.log("call to database did not work correctly");
				cb("database cannot insert");
			}
			else {
				cb(undefined, result.rows);
			}
		});
	});
};

exports.addChallenges = function(title, description, username){
	pg.connect(conn, function(err, client, done){
		if(err){
			console.log("error in connection to database");
			cb("database connection error");
		}

		var qry = 'insert into challenges (title, description, username) values ($1, $2, $3);'; // can use $1, $2, $3  
		client.query(qry , [title, description, username],  function (err, result) {
			done();
				if(err){
					console.log("call to database did not work correctly");
				}

		});
	});
};


