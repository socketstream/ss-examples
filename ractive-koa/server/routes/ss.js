'use strict';

module.exports = function(ss, app, router) {

	ss.client.define('main', {
		view: 'app.jade',
		css: ['app.styl'],
		code: [
			'../static/js/libs/jquery-2.1.3.min.js',
			'app'
		],
		tmpl: '*'
	});

	// // Serve this client on the root URL
	// ss.http.route('/', function(req, res) {
	// 	console.log('getting this far in the world');
	// 	res.serveClient('main');
	// });

	router.get('/', function*() {
		this.res.serveClient('main');
	});

};
