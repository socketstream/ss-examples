'use strict';

// - - - - - - - - - - - - - - - - - - - - - - - - >>>>> vars

var http = require('http');
var ss = require('socketstream');
var ssJade = require('ss-jade');
var ssStylus = require('ss-stylus');
var koa = require('koa');
var connect = require('koa-connect');
var session = require('koa-session');
var router = require('koa-router')();
var app = koa();

// - - - - - - - - - - - - - - - - - - - - - - - - >>>>> config

var config = require('./server/services/config');
// var dbService = require('./server/services/db');

// - - - - - - - - - - - - - - - - - - - - - - - - >>>>> db services

// dbService.connectMongoose();
// dbService.connectRedis();

// - - - - - - - - - - - - - - - - - - - - - - - - >>>>> HTML FORMATTER

// if (ss.env === 'development') {
// 	ssJade.addCompileOptions({
// 		pretty: true
// 	});
// }
ss.client.formatters.add(ssJade, {
	locals: {
		// title: 'Arx :: Home',
		// mobileAgents: JSON.stringify(require(rootDir + '/data/mobile-agents')),
		// SubAtomic: JSON.stringify(SubAtomic.getGlobals()),
		// mobile: false
	},
});

// - - - - - - - - - - - - - - - - - - - - - - - - >>>>> STYLE FORMATTER


// ssStylus.prependStylus(
// 	'$cloudPath = \'' + cloudPath + '/\'\n' +
// 	'$cache = \'' + SubAtomic.get('CACHE') + '\''
// );
ss.client.formatters.add(ssStylus);

// - - - - - - - - - - - - - - - - - - - - - - - - >>>>> TEMPLATE ENGINE

ss.client.templateEngine.use(require('ss-ractive'), '/', {
	pretty: ss.env === 'production' ? false : true
});

// - - - - - - - - - - - - - - - - - - - - - - - - >>>>> ROUTING & KOA

app.keys = [config.get('session:secret')];
app.use(session(app));
app.use(router.routes());
app.use(router.allowedMethods());

// Append SocketStream middleware to the stack
require('./server/services/routes')(ss, app, router);
app.use(connect(ss.http.middleware));
// app.use(function*(next) {
// 	yield ss.http.middleware.bind(null, this.req, this.res);
// 	yield next;
// });

// ss.http.middleware.append(app.callback());

// ss.http.middleware.append(function(req, res, next) {
// 	app.callback.bind(this, req, res);
// 	next();
// });

	

	// router.stack.middleware = router.stack.middleware.concat(ss.http.middleware.stack);

	// ss.http.middleware.append(router.middleware());

	// ss.http.middleware.bind(null, app.callback, app.callback);

	// ss.http.middleware.stack.push(app.callback());

	// app.stack = app.stack.concat(ss.http.middleware.stack)

	// ss.http.middleware.stack = 


// - - - - - - - - - - - - - - - - - - - - - - - - >>>>> PACK ASSETS

// Minimize and pack assets if you type: SS_ENV=production node app.js
if (ss.env === 'production') {
	ss.client.packAssets();
}

ss.start(http.createServer(app.callback()).listen(config.get('port')));
// ss.start(http.createServer(ss.http.middleware).listen(config.get('port')));

// var server = app.listen(config.get('port'), function() {
// 	process.on('uncaughtException', function(err) { console.log(err); });
// 	var local = server.address();
// 	console.log('Koa server listening @ http://%s:%d/ in %s mode', local.address, local.port, app.env);
// 	// Start SocketStream
// 	ss.start(server);
// 	console.log('Ready...set...SubAtomic!'.green);
// });









// // - - - - - - - - - - - - - - - - - - - - - - - - >>>>> PACK ASSETS

// if (ss.env === 'production') {
// 	ss.client.packAssets({
// 		cdn: {
// 			css: function(file) {
// 				return cloudPath + file.path;
// 			},
// 			js: function(file) {
// 				return cloudPath + file.path;
// 			}
// 		}
// 	});
// 	// var oneYear = 31557600000;
// 	// app.use(express.static(__dirname + '/public', { maxAge: oneYear }));
// 	// app.use(express.errorHandler());
// }




// // ~ - ~ - ~ - ~ - ~ - ~ - ~ - ~ - ~ - ~ - ~ - ~ --- >>>
// // ~ - ~ - ~ - ~ - ~ - ~ - ~ - ~ - ~ - ~ - ~ - ~ --- >>> START THE SERVER
// // ~ - ~ - ~ - ~ - ~ - ~ - ~ - ~ - ~ - ~ - ~ - ~ --- >>>

// // server = app.listen(port, function() {
// // 	process.on('uncaughtException', function(err) { console.log(err); });
// // 	var local = server.address();
// // 	console.log('Express server listening @ http://%s:%d/ in %s mode', local.address, local.port, app.settings.env);
// // 	// Start SocketStream
// // 	ss.start(server);
// // 	console.log('Ready...set...SubAtomic!'.green);
// // });


