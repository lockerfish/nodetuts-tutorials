// being careful about the closures in each cycle
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

	coll.forEach(function(elem) { // elem here is provided by forEach closure
		insertElement(elem, function(err, _elem) { // _elem is the insertElement callback
			console.log(_elem + ' element inserted.'); // should use _elem provided by insertElement callback

			if(--left === 0) {
				// now callback is called when ALL are inserted
				callback();
			}
		});
	});
};

insertAll([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], function() {
	console.log('insertAll finished');
});


