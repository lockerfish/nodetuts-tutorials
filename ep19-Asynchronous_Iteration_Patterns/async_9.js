// serializing the inserts
//
// similuating inserting into a database
// which takes random time to execute

var insertElement = function(data, callback) {

	// up to 3 seconds, randomly
	var timeout = Math.ceil(Math.random() * 3000);

	setTimeout(function() {
		callback(null, data);
	}, timeout);

};

var insertAll = function(coll, callback) {

	var queue = coll.slice(0); // duplicates the array

	(function iterate() {

		if (queue.length === 0) {
			callback();
			return;
		}

		elem = queue.splice(0, 1)[0]; // get first elem

		insertElement(elem, function(err, elem) {
			if(err) { throw err; return; }
			console.log(elem + ' inserted.');

			// tail recurtion, DO NOT DO THIS
			// bad things could happen if coll is BIG
			// we could blow the stack
			//
			// to protect ourselves from tail recursion
			// use process.nextTick
			// in other words, finish what you are doing
			// and iterate on the next process cycle
			process.nextTick( iterate );

			// or use setTimeout
			//setTimeout(iterate, 0);

		});
	})();
};

insertAll([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], function() {
	console.log('insertAll finished');
});


