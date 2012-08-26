// Default Auto Mapping
// GET     /products              ->  index
// GET     /products/new          ->  new
// POST    /products              ->  create
// GET     /products/:forum       ->  show
// GET     /products/:forum/edit  ->  edit
// PUT     /products/:forum       ->  update
// DELETE  /products/:forum       ->  destroy

var util = require('util');

exports.index = function(req, res) {
	res.send('products#index');
}

exports.show = function(req, res) {
	res.send('products#show : ' + util.inspect(req.product));
}

exports.new = function(req, res) {
	res.send('products#new');
}

exports.create = function(req, res) {
	res.send('products#create');
}

exports.edit = function(req, res) {
	res.send('products#edit : ' + util.inspect(req.product));
}

exports.update = function(req, res) {
	res.send('products#update');
}

// Auto-Loading

exports.load = function(id, callback) {
	callback(null, { id: id, name: 'Product # ' + id});
}
