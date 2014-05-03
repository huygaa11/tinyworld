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

exports.addChallenges = function(title, description, username, cb){
	pg.connect(conn, function(err, client, done){
	if(err){
		console.log("error in connection to database");
		cb(database connection error);
	}	
	
	var qry = 'insert into challenges (title, description, username) values ($1, $2, $3);'; // can use $1, $2, $3  
	client.query(qry , [title, description, username],  function (err, result) {
		done();
		if(err){
			console.log("call to database did not work correctly");
			cb(database cannot insert);
		}
		else{
			cb(undefined, result.rows[0]);
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
		
	var qry ='select * from challenges'; // query for getting the challenges
	client.query(qry, function (err, result) { //selecting from the db
		done(); // connection done. 
		if(err){ // if cannot select, throw error. bad practice. send callback to user!!!
			console.log("call to database did not work correctly");
			cb(err);
		}
		else{
			cb(undefined, result.rows);
		}

	});
});
};









