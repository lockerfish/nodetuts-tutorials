// being careful about the closures in each cycle
// protecting elem with closure
//
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

	var left = coll.length;
	var elem;

	for (var i = 0; i < coll.length; i++) {
		elem = coll[i];

		// protecting elem with closure
		(function(elem) {
			insertElement(elem, function(err, _elem) {
				console.log(elem + ' element inserted.'); // now elem here is the correct value

				if(--left === 0) {
					// now callback is called when ALL are inserted
					callback();
				}
			});
		})(elem);

	}

};

insertAll([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], function() {
	console.log('insertAll finished');
});


