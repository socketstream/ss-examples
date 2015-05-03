'use strict';

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
		this.body = this.request.body;
	});

	router.get('/api/signout', function*(next) {
	});

};
