'use strict';

// - - - - - - - - - - - - - - - - - - - - - - - - >>>>> vars

var ss = require('socketstream');
var ssJade = require('ss-jade');
var ssStylus = require('ss-stylus');
var koa = require('koa');
var bodyParser = require('koa-body-parser');
var connect = require('koa-connect');
var session = require('koa-session');
var router = require('koa-router')();
var koaJade = require('koa-jade');
var app = koa();
var server;

// - - - - - - - - - - - - - - - - - - - - - - - - >>>>> config

var config = require('./server/config');
var devMode = config.get('env') === 'development';

// - - - - - - - - - - - - - - - - - - - - - - - - >>>>> db services

require('./server/db/mongodb').connect(ss);
require('./server/db/redis').connect(ss);

// - - - - - - - - - - - - - - - - - - - - - - - - >>>>> HTML FORMATTER

ss.client.formatters.add(ssJade, {
	locals: {
		title: 'Koa Ractive SocketStream App :: Home'
	},
	pretty: devMode
});

// - - - - - - - - - - - - - - - - - - - - - - - - >>>>> STYLE FORMATTER


// ssStylus.prependStylus(
// 	'$cloudPath = \'' + cloudPath + '/\'\n' +
// 	'$cache = \'' + SubAtomic.get('CACHE') + '\''
// );
ss.client.formatters.add(ssStylus);

// - - - - - - - - - - - - - - - - - - - - - - - - >>>>> TEMPLATE ENGINE

ss.client.templateEngine.use(require('ss-ractive'), '/', {
	pretty: devMode
});

// - - - - - - - - - - - - - - - - - - - - - - - - >>>>> ROUTING & KOA

app.use(bodyParser());
app.keys = [config.get('session:secret')];
app.use(session(app));
app.use(router.routes());
app.use(router.allowedMethods());
router.use(koaJade.middleware({
	viewPath: './client/views',
	debug: devMode,
	noCache: devMode,
	// locals: global_locals_for_all_pages,
	// basedir: 'path/for/jade/extends',
	// helperPath: [
	// 	'path/to/jade/helpers', {
	// 		random: 'path/to/lib.js'
	// 	}, {
	// 		_: require('lodash')
	// 	}
	// ]
}));
app.use(require('koa-static')(__dirname + '/client/static'));

// Append SocketStream middleware to the stack
require('./server/routes')(ss, app, router);
app.use(connect(ss.http.middleware));

// - - - - - - - - - - - - - - - - - - - - - - - - >>>>> PACK ASSETS

// Minimize and pack assets if you type: SS_ENV=production node app.js
if (ss.env === 'production') {
	ss.client.packAssets();
}

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

