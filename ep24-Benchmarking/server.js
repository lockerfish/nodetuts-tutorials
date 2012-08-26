var net = require('net');

net.createServer(function(conn) {
  conn.on('data', function(data) {
		// putting half a second lag
    setTimeout(function() {
      conn.end(data);
    }, 500);
  });
}).listen(4000);
