var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
	login: String,
	password: String,
	role: String,

	indexes: ['login', 'password'],
});

userSchema.static('authenticate', function(login, password) {
			return this.find({login: login, password: password});
		}
);

mongoose.model('User', userSchema);

