'use strict';

module.exports = function(ss, app, router) {

	router.get('/signin', function*(next) {
		this.render('public', {}, true);
	});

	router.get('/signout', function*(next) {
		this.render('public', {}, true);
	});

};
