'use strict';

// - - - - - - - - - - - - - - - - - - - - - - - - >>>>> vars

var ss = require('socketstream');
var ssJade = require('ss-jade');
var ssStylus = require('ss-stylus');
var koa = require('koa');
var connect = require('koa-connect');
var session = require('koa-session');
var router = require('koa-router')();
var app = koa();
var server;

// - - - - - - - - - - - - - - - - - - - - - - - - >>>>> config

var config = require('./server/services/config');
// var dbService = require('./server/services/db');

// - - - - - - - - - - - - - - - - - - - - - - - - >>>>> db services

// dbService.connectMongoose();
// dbService.connectRedis();

// - - - - - - - - - - - - - - - - - - - - - - - - >>>>> HTML FORMATTER

ss.client.formatters.add(ssJade, {
	locals: {
		title: 'Koa Ractive SocketStream App :: Home'
	},
	pretty: ss.env === 'production' ? false : true
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

// - - - - - - - - - - - - - - - - - - - - - - - - >>>>> PACK ASSETS

// Minimize and pack assets if you type: SS_ENV=production node app.js
if (ss.env === 'production') {
	ss.client.packAssets();
}

// server = http.createServer(app.callback()).listen(config.get('port'), function() {
// 	console.log(server.address());
// 	ss.start(server);
// });


server = app.listen(config.get('port'), function() {
	var local = server.address();

	console.log('Koa server listening @ http://%s:%d/ in %s mode', local.address, local.port, app.env);

	// Start SocketStream
	ss.start(server);

	process.on('uncaughtException', function(err) {
		console.log(err);
	});

});









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


