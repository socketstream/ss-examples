'use strict';

// var config = require('./config');

module.exports = function(ss, app, router) {

	// x-response-time

	app.use(function*(next) {
		var start = new Date(), ms;
		yield next;
		ms = new Date() - start;
		this.set('X-Response-Time', ms + 'ms');
	});

	// logger

	app.use(function*(next) {
		var start = new Date(), ms;
		yield next;
		ms = new Date() - start;
		console.log('%s %s - %s', this.method, this.url, ms);
	});

	// Define a single-page client called 'main'
	ss.client.define('main', {
		view: 'app.jade',
		css: ['app.styl'],
		code: ['libs/jquery.min.js', 'app'],
		tmpl: '*'
	});

	// response

	// // Serve this client on the root URL
	// ss.http.route('/', function(req, res) {
	// 	console.log('getting this far in the world');
	// 	res.serveClient('main');
	// });

	router.get('/', function*(next) {
		this.res.serveClient('main')
	});

	router.get('/test', function*(next) {
		this.body = 'Test...test...test...';
	});

};
