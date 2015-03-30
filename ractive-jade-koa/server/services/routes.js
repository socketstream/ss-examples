
module.exports = function(ss) {

	// TODO: move KOA into the main app...

	var session = require('koa-session');
	var koa = require('koa');
	var app = koa();

	app.keys = [require('./config').get('session:secret')];
	app.use(session(app));

	// logger
	if (ss.env === 'development') {
		app.use(function*(next) {
			// console.log(this);
			var start = new Date;
			yield next;
			var ms = new Date - start;
			console.log('%s %s - %s', this.method, this.url, ms);
		});
	}

	// test response...
	app.use(function*() {
		var n = this.session.views || 0;
		this.session.views = ++n;
		this.body = n + ' views';
	})

	app.listen(3333);

	// TODO: figure out how to append the stack

	// // Append SocketStream middleware to the stack
	// app.stack = ss.http.middleware.stack.concat(app.stack)


	// console.log(app.__proto__);
	// console.log(session);

};
