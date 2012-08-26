var express = require('express');
var fs = require('fs')
var util = require('util');
//var MemStore = require('express/node_modules/connect/lib/middleware/session/memory');
var MemStore = express.session.MemoryStore;
var app = express();

var products = require('./products');
var photos = require('./photos');

app.configure(function() {
	app.use(express.logger());
	app.use(express.static(__dirname + '/static'));
	app.use(express.bodyParser({ keepExtensions: true, uploadDir: __dirname + '/static/uploads/photos/' }));
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	app.use(express.session({
		secret: 'bad ass mother fucker',
		store: MemStore({reapInterval: 60000 * 10})
	}));
	app.use(function(req, res, next) {
		res.locals.session = req.session;
		res.locals.flash = {};
		next();
	});
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

/*
 * express 3.x does not support dynamicHelpers
 * instead, I am using res.locals
app.dynamicHelpers(
	{
		session: function(req, res) {
			return req.session;
		},
		flash: function(req, res) {
			return req.flash();
		}
	}
);
*/

function requiresLogin(req, res, next) {

	if(req.session.user) {
		next();
	} else {
		res.redirect('/sessions/new?redir=' + req.url);
	}
}

app.get('/', function(req, res) {
	res.render('root');
});

var users = require('./users');

/* Sessions */
app.get('/sessions/new', function(req, res) {
	res.render('sessions/new', {redir: req.query.redir});
});

app.post('/sessions', function(req, res) {
	users.authenticate(req.body.login, req.body.password, function(user) {
		if(user) {
			req.session.user = user;
			res.redirect(req.body.redir || '/');
		} else {
			res.locals.flash = { warn: 'login failed'};
			//req.flash('warn', 'Login failed!');
			res.render('sessions/new', {redir: req.body.redir});
		}
	});
});

app.get('/sessions/destroy', function(req, res) {
	delete req.session.user;
	res.redirect('/sessions/new');
});

app.get('/products', requiresLogin, function(req, res) {
	res.render('products/index', {products: products.all});
});

app.get('/products/new', requiresLogin, function(req, res) {
	photos.list(function(err, photo_list) {
		if(err) {
			throw err;
		}
		res.render('products/new', {product: req.body && req.body.product || products.new, photos: photo_list});
	});
});

app.post('/products', requiresLogin, function(req, res) {
	var id = products.insert(req.body.product);
	console.log('id: ' + id);
	console.log('product: ' + req.body.product.name);
	res.redirect('/products/' + id);
});

app.get('/products/:id', function(req, res) {
	var product = products.find(req.params.id);
	res.render('products/show', {product: product});
});

app.get('/products/:id/edit', requiresLogin, function(req, res) {
	var product = products.find(req.params.id);
	photos.list(function(err, photo_list) {
		if(err) {
			throw err;
		}
		res.render('products/edit', {product: product, photos: photo_list});
	});
});

app.put('/products/:id', requiresLogin, function(req, res) {
	var id = req.params.id;
	products.set(id, req.body.product);
	res.redirect('/products/' + id);
});

/* Photos */

app.get('/photos', function(req, res) {
	photos.list(function(err, photo_list) {
		if(err) {
			throw err;
		}
		res.render('photos/index', {photos: photo_list});
	});
});

app.get('/photos/new', function(req, res) {
	res.render('photos/new');
});

app.post('/photos', function(req, res) {

	var photo = req.files.photo;

	if(photo.size === 0) {
		console.log('empty file uploaded');
		fs.unlinkSync(photo.path);
		res.send('empty file uploaded');
	} else {
		var fn = photo.path.split('/');
		fs.rename(photo.path, photo.path.replace(fn[fn.length-1], photo.name));
		res.redirect('/photos');
	}
});

app.listen(4000);
