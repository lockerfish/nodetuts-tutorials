var kue = require('kue');
var jobs = kue.createQueue();

jobs.process('email', 10, function(job, done) {
	console.log(job.data);
	setTimeout(function() {
		try {
			throw new Error('something awful happened');
			console.log('sent email');
			done();
		} catch (err) {
			done(err);
		}
	}, 3000);
});
