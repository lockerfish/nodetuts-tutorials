var http = require('http');
var spawn = require('child_process').spawn;

http.createServer(function(req, res) {

	res.writeHead(200, {'Content-Type':'text/plain'});

	req.connection.on('end', function() {
		tail_child.kill();
	});

	var tail_child = spawn('tail', ['-f', '/var/log/system.log']);

	tail_child.stdout.on('data', function(data) {
		console.log(data.toString());
		res.write(data);
	});

}).listen(4000);
