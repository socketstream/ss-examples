'use strict';

module.exports = {

	setup: function() {

		var SocketStreamApp;

		// Ractive.defaults.debug = true; // TODO turn off if not in development
		// Ractive = Ractive.extend({ data: {} });

		Ractive.components.TestComponent = Ractive.extend({
			template: '#test',
			data: {
				title: 'Sample Ractive-Koa-SocketStream App',
				content: '<p>Sample content <em>here</em>.</p>'
			},
			// etc.
		});

		SocketStreamApp = new Ractive({
			el: 'body',
			template: '#layout',
			append: true
		});

	}

};
