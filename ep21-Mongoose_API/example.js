var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var CommentsSchema = new Schema({
	email: String,
	body: String
});

var PostSchema = new Schema({
	title: String,
	body: String,
	//date: Date
	date: {type: Date, default: Date.now()},
	state: {type: String, enum:[ 'draft', 'published', 'private'], default: 'draft'},
	author: {
		name: String,
		// validation could also be a function
		email: {type: String, validate: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/}
	},
	comments: [CommentsSchema]
});

PostSchema.static('recent', function(days, callback) {
	days = days || 1;
	this.find({date: {$gte: Date.now() - 1000 * 60 * 60 * 24 * days}}, callback);
});

PostSchema.virtual('shortBody').get(function() {
	return this.body.substring(0, 50);
});

mongoose.connect('mongodb://localhost/mydatabase');

mongoose.model('Post', PostSchema);

var Post = mongoose.model('Post');

var post = new Post();
post.title = 'My first blog post';
post.body = 'Post body';
post.body = 'Post body flkdj fljsdklf dsflj sdlfj sdlkfj lsjf dkfjs dlkfj sdlkfj sdklfjs\
sfçl sdfkds flkjsd lfkjsd klfjfdsç flksdjf slkdjf lksdjf lkdsjf lksdjfdlsjfdsl kj\
sfçl sdfkds flkjsd lfkjsd klfjfdsç flksdjf slkdjf lksdjf lkdsjf lksdjfdlsjfdsl kj\
sfçl sdfkds flkjsd lfkjsd klfjfdsç flksdjf slkdjf lksdjf lkdsjf lksdjfdlsjfdsl kj\
sfçl sdfkds flkjsd lfkjsd klfjfdsç flksdjf slkdjf lksdjf lkdsjf lksdjfdlsjfdsl kj\
sfçl sdfkds flkjsd lfkjsd klfjfdsç flksdjf slkdjf lksdjf lkdsjf lksdjfdlsjfdsl kj\
sfçl sdfkds flkjsd lfkjsd klfjfdsç flksdjf slkdjf lksdjf lkdsjf lksdjfdlsjfdsl kj\
sfçl sdfkds flkjsd lfkjsd klfjfdsç flksdjf slkdjf lksdjf lkdsjf lksdjfdlsjfdsl kj';
//post.date = Date.now();
post.state = 'published';
post.author.name = 'Hendrix';
post.author.email = 'some@gmail.com';
post.comments.push( {
	email: 'another@gmail.com',
	body: 'comment body'
});
post.save(function(err) {
	if(err) { throw err; }
	console.log('saved');
	//Post.find({title: 'My first blog post'}, function(err, posts){
	Post.recent(10, function(err, posts){
		if(err) { console.log(err); throw err; }
		console.log('found');
		posts.forEach(function(post) {
			console.log(post.shortBody);
		});
		mongoose.disconnect();
	});
});
