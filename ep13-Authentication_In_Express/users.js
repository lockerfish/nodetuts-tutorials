var users = {
	'hendrix': {login: 'hendrix', password: 'password', role: 'admin'},
	'kayla': {login: 'kayla', password: 'password', role: 'user'}
};

module.exports.authenticate = function(login, password, callback) {

	var user = users[login];
	if(!user) {
		callback(null);
		return;
	}

	if(user.password === password) {
		callback(user);
		return;
	}
	callback(null);
};
