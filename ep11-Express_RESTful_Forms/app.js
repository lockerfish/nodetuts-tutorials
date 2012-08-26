var express = require('express');

var app = express();

app.configure(function() {
	app.use(express.logger());
	app.use(express.static(__dirname + '/static'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
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

app.get('/products/new', function(req, res) {
	res.render('products/new', {product: req.body && req.body.product || products.new});
});

app.post('/products', function(req, res) {
	var id = products.insert(req.body.product);
	console.log('id: ' + id);
	console.log('product: ' + req.body.product.name);
	res.redirect('/products/' + id);
});

app.get('/products/:id', function(req, res) {
	var product = products.find(req.params.id);
	res.render('products/show', {product: product});
});

app.get('/products/:id/edit', function(req, res) {
	var product = products.find(req.params.id);
	res.render('products/edit', {product: product});
});

app.put('/products/:id', function(req, res) {
	var id = req.params.id;
	products.set(id, req.body.product);
	res.redirect('/products/' + id);
});

app.listen(4000);
