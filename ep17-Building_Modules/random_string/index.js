
//module.exports = function(string_length) {...};

// this way the module is behaving like a singleton class
//module.exports.generate = function(string_length) {
/*
var string_length;
module.exports.generate = function() {
	if (string_length == 0) {
		string_length = 6;
	}
	var chars = 'abcdefghiklmnopqrstuvwxyz';
	var randomstring = '';
	for (var i = 0; i < string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum, rnum+1);
	}
	return randomstring;
};

//module.exports.abc = 'ABC'
module.exports.setLength = function(length) {
	string_length = length;
};
*/
// pseudo class
// constructor
var RandomStringGenerator = function(string_length) {
	this.string_length = string_length || 6;
}

RandomStringGenerator.prototype.generate = function() {
	var chars = 'abcdefghiklmnopqrstuvwxyz';
	var randomstring = '';
	for (var i = 0; i < this.string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum, rnum+1);
	}
	return randomstring;
};

//module.exports = RandomStringGenerator;

//better yet, factory function
module.exports.create = function(string_length) {
	return new RandomStringGenerator(string_length);
};

// obeying to open-close principal
// open for extending close to changes
module.exports._class = RandomStringGenerator;
