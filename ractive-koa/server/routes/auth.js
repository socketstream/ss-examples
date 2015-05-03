'use strict';

module.exports = function(ss, app, router) {

	router.get('/signin', function*(next) {
		this.body = 'Test...test...test...';
	});

};
