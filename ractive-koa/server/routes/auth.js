'use strict';

var User = require('../models/user').User;

module.exports = function(ss, app, router) {

	// - - - - - - - - - - - - - - - - - - - - - - - - >>>>> Pages

	router.get('/signin', function*(next) {
		this.render('auth/signin', {}, true);
	});

	router.get('/signout', function*(next) {
		this.render('auth/signout', {}, true);
	});

	// - - - - - - - - - - - - - - - - - - - - - - - - >>>>> API

	router.post('/api/join', function*(next) {
		this.body = this.request.body;
	});

	router.post('/api/signin', function*(next) {
		var newUser = new User(this.request.body);
		newUser.save(function(err, user) {
			if (err) {
				return console.error(err);
			}
		});
		this.body = this.request.body;
	});

	router.get('/api/signout', function*(next) {
	});

};
