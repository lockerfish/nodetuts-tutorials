var http = require('http').createServer(handler);
var io = require('socket.io').listen(http);
var sys = require('sys');
var fs = require('fs');

var clients = [];

http.listen(4000);

function handler(request, response) {

	response.writeHead(200, {
		'Content-Type':'text/html'
	});

	var rs = fs.createReadStream(__dirname + '/template.html');

	sys.pump(rs, response);

};

io.sockets.on('connection', function(socket) {

	socket.send('Welcome to this chat server!');
	socket.send('Please input your username:');

	var username;

	socket.on('message', function(message) {
		if(!username) {
			username = message;
			socket.send('Welcome, ' + username + '!');
			return;
		}

		// send message to me
		socket.send(username + ' said: ' + message);
		// and broadcast to everyone else
		socket.broadcast.send(username + ' said: ' + message);
	});

});


