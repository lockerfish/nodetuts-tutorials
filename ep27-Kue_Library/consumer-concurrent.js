var kue = require('kue');
var jobs = kue.createQueue();

jobs.process('email', 10, function(job, done) {
	console.log(job.data);
	setTimeout(function() {
		console.log('sent email');
		done();
	}, 3000);
});
