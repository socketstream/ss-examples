'use strict';

var User = require('../models/user').User;

module.exports = function(ss, app, router) {

	// - - - - - - - - - - - - - - - - - - - - - - - - >>>>> Pages

	router.get('/signin', function*() {
		this.render('auth/signin', {}, true);
	});

	router.get('/signout', function*() {
		this.render('auth/signout', {}, true);
	});

	// - - - - - - - - - - - - - - - - - - - - - - - - >>>>> API

	router.post('/api/join', function*() {
		this.body = this.request.body;
	});

	router.post('/api/signin', function*() {
		var body = this.request.body;
		var user = yield User.findOne({ username: body.username });
		if (user) {
			console.log('Username already taken'.red.inverse); // TODO: username or email
			this.body = 'Username already taken';
		} else {
			console.log('no user found!'.green.inverse, user);
			var newUser = new User({
				username: body.username,
				password: body.password,
				email: body.email
			});
			user = yield newUser.save();
			console.log(user);
			console.log('New user created'.green.inverse);
			this.body = user;
		}
	});

	router.get('/api/signout', function*() {
	});

};
