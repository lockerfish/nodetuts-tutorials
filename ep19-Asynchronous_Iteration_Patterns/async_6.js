// being careful about the closures in each cycle
// replacing forEach with typical for loop
// to prove
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
		insertElement(elem, function(err, _elem) { // _elem is the insertElement callback
			console.log(elem + ' element inserted.'); // elem will ALWAYS be 10, why?
			// elem here is always 10 because it is set to the last value
			// by the time this call is executed
			// remember, its running asynchronously
			// so, elem = coll[i] runs and then insertElement which returns immediately 10 times
			// so the last value for elem is 10
			// btw, the right values are passed into insertElement, just that elem inside the
			// callback function will be whatever its last value is

			if(--left === 0) {
				// now callback is called when ALL are inserted
				callback();
			}
		});
	}

};

insertAll([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], function() {
	console.log('insertAll finished');
});


