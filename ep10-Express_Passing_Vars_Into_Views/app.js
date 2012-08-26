var express = require('express');

var app = express();

app.configure(function() {
	app.use(express.logger());
	app.use(express.static(__dirname + '/static'));
});

app.configure('development', function() {
	app.use(express.errorHandler({
		dumpExceptions: true,
		showStack: true
	}));
});

app.configure('production', function() {
	app.use(express.errorHandler());
});

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', function(req, res) {
	res.render('root');
});

var products = require('./products');

app.get('/products', function(req, res) {
	res.render('products/index', {products: products.all});
});

app.get('/products/:id', function(req, res) {
	var product = products.find(req.params.id);
	res.render('products/show', {product: product});
});

app.listen(4000);
