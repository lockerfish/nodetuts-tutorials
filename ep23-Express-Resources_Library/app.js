var express = require('express');

require('express-resource');

var app = express();

app.configure(function() {
	app.use(express.methodOverride());
	app.use(express.bodyParser());
	app.use(app.router);
});

app.configure('development', function() {
	app.use(express.static(__dirname + '/public'));
	app.use(express.errorHandler({
		dumpExceptions: true,
		showStack: true
	}));
});

app.configure('production', function() {
	var oneYear = 31557600000;
	app.use(express.static(__dirname + '/public', { maxAge: oneYear}));
	app.use(express.errorHandler());
});

var products = app.resource('products', require('./modules/products'));
var forums = app.resource('forums', require('./modules/forums'));

// nesting resources
// products contains forums
// so, /products/1/forums is a valid resource
// it points to forums index and it loads
// the product and the forum object

products.add(forums);

app.listen(4000);
