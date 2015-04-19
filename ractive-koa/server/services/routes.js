'use strict';

// var config = require('./config');

module.exports = function(ss, app, router) {
	// TODO: move KOA into the main app...

	// x-response-time

	app.use(function*(next) {
		var start = new Date();
		yield next;
		var ms = new Date() - start;
		this.set('X-Response-Time', ms + 'ms');
	});

	// logger

	app.use(function*(next) {
		var start = new Date();
		yield next;
		var ms = new Date() - start;
		console.log('%s %s - %s', this.method, this.url, ms);
	});

	// response

	// app.use(function*() {
	// 	this.body = 'Hello World';
	// });

	router.get('/test', function*(next) {
		this.body = 'Test...test...test...';
	});

	// // Define a single-page client called 'main'
	// ss.client.define('main', {
	// 	view: 'app.jade',
	// 	css: ['app.styl'],
	// 	code: ['libs/jquery.min.js', 'app'],
	// 	tmpl: '*'
	// });

	// // Serve this client on the root URL
	// ss.http.route('/', function(req, res) {
	// 	res.serveClient('main');
	// });


};
