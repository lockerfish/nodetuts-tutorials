var http = require('http');
var fs = require('fs');
var sys = require('sys');

var file_path = __dirname + '/../images/cat.jpg';
fs.stat(file_path, function(err, stats) {

	if(err) {
		throw err;
	}

	http.createServer(function(request, response) {

		response.writeHead(200, {
			'Content-Type': 'image/jpeg',
			'Content-Length': stats.size
		});

		// NOT VERY GOOD SINCE WE ARE SENDING THE WHOLE FILE AT ONCE
		//fs.readFile(file_path, function(err, file_content) {
		//	response.write(file_content);
		//	response.end();
		//});

		var rs = fs.createReadStream(file_path);
		// MUCH BETTER, STREAMING DATA TO CLIENT
//		rs.on('data', function(data) {
//			var flushed = response.write(data);
//			if(!flushed) {
//				rs.pause();
//			}
//		});
//
//		response.on('drain', function() {
//			rs.resume();
//		});
//
//		rs.on('end', function() {
//			response.end();
//		});

		// FINALLY, USING pump pattern
		sys.pump(rs, response, function(err) {
			if(err) {
				throw err;
			}
		});

	}).listen(4000);
});

