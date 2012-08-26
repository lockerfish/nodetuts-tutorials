var kue = require('kue');
var jobs = kue.createQueue();

var sequence = 0;

setInterval(
	function() {
		sequence += 1;
		(function(sequence) {
			var job = jobs.create('email', {
				title: 'Hello # ' + sequence,
				to: 'hendrix@lockerfish.com',
				body: 'Hello from Node Tuts'
			}).save();

			job.on('complete', function() {
				console.log('job ' + sequence + ' completed');
			});

			job.on('failed', function() {
				console.log('job ' + sequence + ' failed');
			});
		})(sequence);
	}
, 1000);
