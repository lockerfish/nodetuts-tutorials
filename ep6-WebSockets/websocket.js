var http = require('http');
var i=0;
var server = http.createServer(function(request, response) {

	setTimeout(function() {
		response.writeHead(200, {'Content-Type':'text/plain'});
		response.end('Hello World! ' + i++ + '\n');
	}, 4000);
});

server.listen(4000);
