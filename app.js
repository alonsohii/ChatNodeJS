var express = require('express'),
	app = express(),
	server = require('http').Server(app),
	io = require('socket.io').listen(server),
	mongoose = require('mongoose'),
	geoip = require('geoip-lite'),
	Helper = require('./app/helpers/general'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    path = require("path"),
    AutCtrl = require('./app/controllers/aut'),
    UsuariosCtrl = require('./app/controllers/users'),
    PaisesCtrl = require('./app/controllers/catpaises'),
    Middleware = require('./app/middleware'),
	Helper = require('./app/helpers/general'),
    bodyParser = require('body-parser');

//	var server = require('http').Server(app);
//var io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json 
app.use(bodyParser.json())

var i18n = require('i18n');

i18n.configure({

    //define how many languages we would support in our application
    locales: ['en', 'zh'],

    //define the path to language json files, default is /locales
    directory: __dirname + '/locales',

    //define the default language
    defaultLocale: 'en',

    // define a custom cookie name to parse locale settings from 
    cookie: 'i18n'
});

app.use(i18n.init);

server.listen(8080);
 console.log("localhost:8080");

mongoose.connect('mongodb://localhost/chat', {
  useMongoClient: true,
  /* other options */
});




app.get('/' , function(req,res){
	var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
	res.sendfile(__dirname+'/index.html');
});
/*
app.get('/test' , function(req,res){
	var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
	res.sendfile(__dirname+'/testing.html');
});


app.get('/ip' , function(req,res){
	geoip = require('geoip-lite');
	var ip = "";
	res.json({
		ip:  geoip.lookup(ip)
	});
});
*/


// Socket.io
var ModuloChat = require('./app/modules/chatjs.js')({
	io:io,
	mongoose:mongoose
});

// Json WebToken
var ModuloWebApi = require('./app/modules/api.js')({
	AutCtrl: AutCtrl,
	Middleware: Middleware,
	express:express,
	app:app
});

// Router
var Modulo = require('./app/modules/pages.js')({
	Helper:Helper,
	PaisesCtrl:PaisesCtrl,
	UsuariosCtrl :UsuariosCtrl,
	app:app
});









