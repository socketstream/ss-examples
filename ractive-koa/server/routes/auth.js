'use strict';

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

		var body = this.request.body;
		var errors = [];
		var user, session;

		// TODO: validation!!!
		if (!body.password && body.password.length < 7) {
			errors.push('Passwords must be at least 6 characters.');
		}
		if (!body.username && body.username.length < 3) {
			errors.push('Usernames must be at least 3 characters long');
		}
		// TODO: create DRY error function
		if (errors.length) {
			console.log(errors.join('\n').red.inverse);
			this.body = {
				error: true,
				messages: errors
			};
		} else {
			user = yield User.findOne({ username: body.username });
			if (!user) {
				// console.log(user);
				errors.push('...Username already taken...');
				console.log(errors.join('\n').red.inverse);
				this.body = {
					error: true,
					messages: errors
				};
			} else {
				console.log('...user found!...'.green.inverse, user);
				var valid = yield user.validatePassword.bind(user, body.password);
				session = this.req.session;
				if (valid) {
					session.userId = user._id;
					session.user = yield user.getUser();
					session = yield saveSession;
					// console.log(session);
					this.body = _.merge(session.user, {
						id: user._id
					});
				} else {
					if (session.userId) {
						delete session.userId;
						session = yield saveSession;
					}
					this.body = {
						error: true,
						messages: ['Invalid password.']
					};
				}
			}
		}

	});

	router.get('/api/signout', function*() {
		var session = this.req.session;
		if (session.userId) {
			delete session.userId;
			session = yield saveSession;
		}
		console.log('...session logged out...'.green.inverse);
		this.body = session;
	});

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