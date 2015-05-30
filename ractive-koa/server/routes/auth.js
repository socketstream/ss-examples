'use strict';

// var bcrypt = require('bcrypt');

var _ = require('lodash');

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
		var body = this.request.body;
		var errors = [];
		var user, newUser;

		// TODO: separate out this validation into different ajax calls and functionality
		if (body.password !== body.passwordConfirm) {
			errors.push('Password and confirm password do not match.');
		}
		user = yield User.findOne({ username: body.username });
		if (user) {
			errors.push('Username already taken');
		}
		// couldn't this be done w/ one MongoDB call?
		user = yield User.findOne({ email: body.email });
		if (user) {
			errors.push('Email already taken');
		}
		if (errors.length) {
			console.log(errors.join(' ').red.inverse);
			this.body = {
				error: true,
				messages: errors
			};
		} else {
			console.log(' no user found! '.green.inverse, user);
			newUser = new User({
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

	router.post('/api/signin', function*() {
		this.body = this.request.body;
	});

	router.get('/api/signout', function*() {
	});

	// thunkify this synchronous callback
	function saveSession(callback) {
		/* jshint validthis:true */
		var session = this.req.session;
		session.save(function(err) {
			if (err) {
				session = {
					status: 'failure',
					reason: err
				};
			}
			callback(null, session);
		});
	}

	router.get('/api/session', function*() {
		var session = this.req.session;
		if (session && session.userId) {
			session.type = 'existing session';
		} else {
			session.userId = _.uniqueId();
			session.type = 'new session';
			session = yield saveSession;
		}
		console.log(session);
		this.body = session;
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
