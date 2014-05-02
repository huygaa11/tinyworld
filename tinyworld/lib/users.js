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


exports.add=function(username, fname, lname, age, password, callback){
	exists(username, function(found){
		if(found) callback('user exists');
		else {
			pg.connect(conn, function(err, client, done){
				if(err){
					console.log("error in connection to database");
					throw err;
				}
	
				var qry = 'insert into users (username, fname, lname, age, password) values ($1, $2, $3, $4, $5)' + 'returning username;'; // can use $1, $2, $3  

				client.query(qry , [username, fname, lname, age, password],  function (err, result) {
					done();
					console.log(result.rows[0].username);
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

// GET_ALL_USERS function returns all the users in the database
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
		else {
			if(password !== result.rows[0].password) callback('Password invalid');
			else {
				callback(undefined, result.rows[0].username);
			}
		}
		
	});
});
};

