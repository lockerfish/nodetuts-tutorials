// Default Auto Mapping
// GET     /forums              ->  index
// GET     /forums/new          ->  new
// POST    /forums              ->  create
// GET     /forums/:forum       ->  show
// GET     /forums/:forum/edit  ->  edit
// PUT     /forums/:forum       ->  update
// DELETE  /forums/:forum       ->  destroy

var util = require('util');

exports.index = function(req, res) {
	res.send('forums#index');
}

exports.show = function(req, res) {
	res.send('forums#show : ' + util.inspect(req.forum));
}

exports.new = function(req, res) {
	res.send('forums#new');
}

exports.create = function(req, res) {
	res.send('forums#create');
}

exports.edit = function(req, res) {
	res.send('forums#edit : ' + util.inspect(req.forum));
}

exports.update = function(req, res) {
	res.send('forums#update');
}

// Auto-Loading

exports.load = function(id, callback) {
	callback(null, { id: id, name: 'Forum # ' + id});
}

