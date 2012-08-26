
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', {
		title: 'everyauth Twitter',
    loggedIn: req.loggedIn,
	  user: req.loggedIn && req.session.auth.twitter.user.name
	});
};
