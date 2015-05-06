'use strict';

// var bcrypt = require('bcrypt');

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
			// req.session.authenticated = true;
			// req.session.user = user.getUser();
			this.body = {
				id: user._id,
				username: user.username,
				// password: true,
				email: user.email
			};
		}
	});

	router.get('/api/signout', function*() {
	});


		// 	url: '/api/join',
		// 	type: 'post',
		// 	data: $(this).serialize()
		// }).done(function(data) {

		// 	url: '/api/signout',
		// 	type: 'GET'
		// }).done(function(data) {
		// 	window.location = '/';

};
