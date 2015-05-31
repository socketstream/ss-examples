(function() {
	'use strict';

	var console = window.console || { log: function() {} };

	// This file automatically gets called first by SocketStream and must always exist

	// Make 'ss' available to all modules and the browser console
	window.ss = require('socketstream');

	ss.server.on('disconnect', function() {
		console.log('Connection down :-(');
	});

	ss.server.on('reconnect', function() {
		console.log('Connection back up :-)');
	});

	ss.server.on('ready', function() {

		console.info('%c SocketStream is ready.', 'color: #00c1a1;');

		require('/app').setup();
		// ss.rpc('session.get'); // TEMPORARY, for testing only

	});

})();
