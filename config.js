module.exports = {

	'secret': 'ilovescotchyscotch',
	'database': 'mongodb://localhost/test'

};


exports.Puerto = function(req,res){
	return process.env.PORT || 8080; // used to create, sign, and verify tokens
}


