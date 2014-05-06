/*
	This file includes methods to manipulate user database
*/

// creating connections with the database
var pg = require('pg');
var connString = 'postgres://vagrant:vagrant@localhost/vagrant';
var conn = connString;

/* template for inserting into the database
pg.connect(conn, function(err, client, done){
	if(err){
		console.log("error in connection to database");
		throw err;
	}	
	
	var qry = 'insert into <table> (names) values (values);'; // can use $1, $2, $3  
	client.query(qry , [values to put in for $ values],  function (err, result) {
		done();
		if(err){
			console.log("call to database did not work correctly");
			throw err;
		}
		//done inserting.
	});
});
*/

/* template for selecting from the database
pg.connect(conn, function(err, client, done){ // connecting to the db
	if(err){ // if cannot connect to the db throw error, bad practice!! send callback!
		console.log("error in connection to database");
		throw err;
	}	
		
	var qry ='select * from users'; // used for not making the client.query too big. 
	client.query(qry, function (err, result) { //selecting from the db
		done(); // connection done. 
		if(err){ // if cannot select, throw error. bad practice. send callback to user!!!
			console.log("call to database did not work correctly");
			throw err;
		}
		// do something with the result 
	});
});
*/

/*
	this function adds user to the database. if there is an error it returns error
	if there is not error, it returns the user added.
*/
exports.add=function(username, fname, lname, age, password, bio, callback){
	exists(username, function(found){
		if(found) callback('user exists');
		else {
			pg.connect(conn, function(err, client, done){
				if(err){
					console.log("error in connection to database");
					throw err;
				}
	
				var qry = 'insert into users (username, fname, lname, age, password, bio) values ($1, $2, $3, $4, $5, $6)' + 'returning username;'; // can use $1, $2, $3  

				client.query(qry , [username, fname, lname, age, password, bio],  function (err, result) {
					done();
					if(err){
						console.log("call to database did not work correctly");
						callback(err);
					}
					else callback(undefined, result.rows[0].username);
				});
			});
		}
	});
}; 

/*
	this function checks if user is in the database. if there is an error it returns error
	if there is no error, it returns null.
*/
var exists = function(username, cb){
pg.connect(conn, function(err, client, done){ // connecting to the db
	if(err){ // if cannot connect to the db throw error, bad practice!! send callback!
		console.log("error in connection to database");
		throw err;
	}
	var qry ='select username from users where username=$1'; // used for not making the client.query too big. 
	client.query(qry, [username], function (err, result) { //selecting from the db
		done(); // connection done. 
		if(err){ // if cannot select, throw error. bad practice. send callback to user!!!
			console.log("call to database did not work correctly");
			cb(err);
		}
		// do something with the result 
		if(result.rows) cb(undefined);
		else cb('found');
	});
});
};

/*
	this function checks if user is in the database. if there is an error it returns error
	if there is no error, it returns null.
*/
exports.exists = function(username, cb){
pg.connect(conn, function(err, client, done){ // connecting to the db
	if(err){ // if cannot connect to the db throw error, bad practice!! send callback!
		console.log("error in connection to database");
		throw err;
	}

	var qry ='select username from users where username=$1'; // used for not making the client.query too big. 
	client.query(qry, [username], function (err, result) { //selecting from the db
		done(); // connection done. 
		if(err){ // if cannot select, throw error. bad practice. send callback to user!!!
			console.log("call to database did not work correctly");
			cb(err);
		}
		// do something with the result 
		if(result.rows) cb(undefined);
		else cb('found');
	});
});
};

/*
	this function gets an user is in the database. if there is an error it returns error
	if there is no error, it returns the user.
*/
exports.getuser=function(username, cb){
pg.connect(conn, function(err, client, done){ // connecting to the db
	if(err){ // if cannot connect to the db throw error, bad practice!! send callback!
		console.log("error in connection to database");
		throw err;
	}

	var qry ='select * from users where username=$1'; // used for not making the client.query too big.
	client.query(qry, [username], function (err, result) { //selecting from the db
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

/*
	GET_ALL_USERS function returns all the users in the database
*/
exports.getAllUsers=function(cb){
pg.connect(conn, function(err, client, done){ // connecting to the db
	if(err){ // if cannot connect to the db throw error, bad practice!! send callback!
		console.log("error in connection to database");
		throw err;
	}
		
	var qry ='select * from users order by popularity DESC;'; // used for not making the client.query too big. 
	client.query(qry, function (err, result) { //selecting from the db
		done(); // connection done. 
		if(err){ // if cannot select, throw error. bad practice. send callback to user!!!
			console.log("call to database did not work correctly");
			cb(err);
		}
		else {
			console.log(result.rows);
			cb(undefined, result.rows);
		}
	});
});
}; //  GET_ALL_USERS  ends here

/*
	this function validates user information. if there is an error it returns error
	if there is no error, the user.
*/
exports.validate = function(username, password, callback){
	pg.connect(conn, function(err, client, done){ // connecting to the db
	if(err){ // if cannot connect to the db throw error, bad practice!! send callback!
		console.log("error in connection to database");
		throw err;
	}

	var qry ='select * from users where username=$1'; // used for not making the client.query too big. 
	client.query(qry, [username], function (err, result) { //selecting from the db
		done(); // connection done. 
		if(err){ // if cannot select, throw error. bad practice. send callback to user!!!
			console.log("call to database did not work correctly");
			callback(err);
		}
		// do something with the result 
		else if(result.rows.length === 0) callback('no such user');
		else {
			if(password !== result.rows[0].password) callback('Password invalid');
			else {
				callback(undefined, result.rows[0].username);
			}
		}
		
	});
});
};

/*
	end of the file
*/

