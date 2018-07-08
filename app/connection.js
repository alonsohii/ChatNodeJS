var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'nose1234',
  database : 'chatjs',
   multipleStatements: true
});

connection.connect(function(err){
	if(!err) {
	    console.log("Database Mysql is connected ... "  );    
	} else {
		 if (err) throw err;
	    console.log("Error connecting database Mysql... "+ err);    
	}
});



function handleDisconnect(connection){
	connection.on('error', function(err){
	  if(!err.fatal)
	  {
		return;
	  }
	  if(err.code !== 'PROTOCOL_CONNECTION_LOST')
	  {
		throw err;
	  }
	  console.log('\nRe-connecting lost connection: ' +err.stack);
  
	  connection = mysql.createConnection(connection.config);
	  handleDisconnect(connection);
	  connection.connect();
	});
  }
  
  handleDisconnect(connection);


module.exports = connection;