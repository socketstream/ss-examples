'use strict';

module.exports = function(ss, app, router) {

	if (app.env === 'development') {

		// // x-response-time
		// app.use(function*(next) {
		// 	var start = new Date(),
		// 		ms;
		// 	yield next;
		// 	ms = new Date() - start;
		// 	this.set('X-Response-Time', ms + 'ms');
		// });

		// logger
		router.use(function*(next) {
			var milliseconds, start = new Date();
			yield next;
			milliseconds = new Date() - start;
			console.log('%s %s - %s'.green, this.method, this.url, milliseconds);
		});

	}

};
