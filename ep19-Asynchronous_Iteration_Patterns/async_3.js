
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

	coll.forEach(function(elem) {
		insertElement(elem, function(err, elem) {
			console.log(elem + ' element inserted.');
		});
	});
	// callback will be called immediately
	// before all elems are inserted
	callback(); // naive approach, DO NOT DO THIS
};

insertAll([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], function() {
	console.log('insertAll finished');
});


