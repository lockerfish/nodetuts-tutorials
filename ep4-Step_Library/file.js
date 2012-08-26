var http = require('http');
var fs = require('fs');
var step = require('step');

var file_path = __dirname + '/../images/cat.jpg';
var file_size;
var file_content;

step(

	function get_file_size() {
		// result of fs.stat is passed into this
		fs.stat(file_path, this);
	},

	function store_file_size(err, stat) {
		// stat is the result from previous function fs.stat
		if(err) throw err;
		file_size = stat.size;
		this();
	},

	function read_file_into_memory() {
		// result of fs.readFile is passed into this
		fs.readFile(file_path, this);
	},

	function create_server(err, file_content) {
		// file_content is the result from previous function fs.readFile
		if(err) throw err;

		http.createServer(function(request, response) {

			response.writeHead(200, {
				'Content-Type': 'image/jpeg',
				'Content-Length': file_size
			});

			response.end(file_content);

		}).listen(4000);
	}
);

