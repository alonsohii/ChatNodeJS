
var socketIO;
exports.receivers = (io,emi) => {
	console.log('modulo');
	socketIO = io;
	globalIo.emit(emi,'hola');
	//io.broadcast.emit('emi', "this is a test");

//console.log(io.sockets);

io.sockets.on('connection', function (socket) {
	console.log('conectdo');
 socket.emit('emi', 'data');

});


}