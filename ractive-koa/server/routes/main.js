'use strict';

// var config = require('./config');

module.exports = function(ss, app, router) {

	require('./middleware')(ss, app, router);

	ss.client.define('main', {
		view: 'app.jade',
		css: ['app.styl'],
		code: ['libs/jquery.min.js', 'app'],
		tmpl: '*'
	});

	// // Serve this client on the root URL
	// ss.http.route('/', function(req, res) {
	// 	console.log('getting this far in the world');
	// 	res.serveClient('main');
	// });

	router.get('/', function*(next) {
		this.res.serveClient('main')
	});

	require('./auth')(ss, app, router);

};
