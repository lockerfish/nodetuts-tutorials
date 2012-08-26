var net = require('net');
var stats = require('./statistics');

function connect() {
  process.stdout.write('#');
  var time = Date.now(); // get time before connecting
  var conn = net.createConnection(4000);

  conn.on('connect', function() {
		// record time to connect
    stats.collect('connect', Date.now() - time);
		var latencyTime = Date.now(); // get time before sending data
    conn.write('Hello');
    conn.on('data', function(data) {
			// record time it took to send data
      stats.collect('latency', Date.now() - latencyTime);
    });
  });

  conn.on('close', function() {
    conn.end();
  });
}

setInterval(connect, 100);

process.on('SIGINT', function() {
  console.log("\n######## summary:");
  stats.summarize();
  process.exit();
});
