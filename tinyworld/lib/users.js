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
		if(found) cb('user exists');
		else {
			
		}
	});
};

var exists = function(username, cb){
pg.connect(conn, function(err, client, done){ // connecting to the db
	if(err){ // if cannot connect to the db throw error, bad practice!! send callback!
		console.log("error in connection to database");
		throw err;
	}	
		
	var qry ='select uname from users where uname=$1'; // used for not making the client.query too big. 
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
