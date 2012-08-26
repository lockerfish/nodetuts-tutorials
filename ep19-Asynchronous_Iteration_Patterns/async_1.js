
// similuating inserting into a database
// which takes random time to execute

var async = function(data, callback) {

	// up to 3 seconds, randomly
	var timeout = Math.ceil(Math.random() * 3000);

	setTimeout(function() {
		callback(null, data);
	}, timeout);

};

console.log('calling async()');
async(1, function(err, data) {
	console.log('async returned with data: ' + data);
});
