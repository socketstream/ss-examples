'use strict';

// var bcrypt = require('bcrypt');

var _ = require('lodash');
var User = require('../models/user').User;
var policies = require('./policies');

module.exports = function(ss, app, router) {

	// - - - - - - - - - - - - - - - - - - - - - - - - >>>>> Pages

	router.get('/signin', policies.isLoggedOut, function*() {
		this.render('auth/signin', {}, true);
	});

	router.get('/signout', function*() {
		this.render('auth/signout', {}, true);
	});

	// - - - - - - - - - - - - - - - - - - - - - - - - >>>>> API

	router.post('/api/join', function*() {
		var body = this.request.body;
		var errors = [];
		var user, newUser, session;

		// TODO: separate out this validation into different ajax calls and functionality
		if (body.password !== body.passwordConfirm) {
			errors.push('...Password and confirm password do not match...');
		}
		user = yield User.findOne({ username: body.username });
		if (user) {
			errors.push('...Username already taken...');
		}
		// couldn't this be done w/ one MongoDB call?
		user = yield User.findOne({ email: body.email });
		if (user) {
			errors.push('...Email already taken...');
		}
		if (errors.length) {
			console.log(errors.join('\n').red.inverse);
			this.body = {
				error: true,
				messages: errors
			};
		} else {
			console.log('...no user found!...'.green.inverse, user);
			newUser = new User({
				username: body.username,
				password: body.password,
				email: body.email
			});
			user = yield newUser.save();
			console.log(user);
			console.log('...New user created...'.green.inverse);
			session = this.req.session;
			session.userId = user._id;
			session.user = yield user.getUser();
			session = yield saveSession;
			console.log(session);
			this.body = _.merge(session.user, {
				id: user._id
			});
		}
	});

	router.post('/api/signin', function*() {
		this.body = this.request.body;
	});

	router.get('/api/signout', function*() {});

};

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