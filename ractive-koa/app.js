'use strict';

// - - - - - - - - - - - - - - - - - - - - - - - - >>>>> vars

var http = require('http');
var ss = require('socketstream');
var ssJade = require('ss-jade');
var ssStylus = require('ss-stylus');

var config = require('./server/services/config');
// var dbService = require('./server/services/db');

// - - - - - - - - - - - - - - - - - - - - - - - - >>>>> db services

// dbService.connectMongoose();
// dbService.connectRedis();

// - - - - - - - - - - - - - - - - - - - - - - - - >>>>> ROUTES

require('./server/services/routes')(ss);

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

// - - - - - - - - - - - - - - - - - - - - - - - - >>>>> PACK ASSETS

// Minimize and pack assets if you type: SS_ENV=production node app.js
if (ss.env === 'production') {
	ss.client.packAssets();
}

// start web server
var server = http.Server(ss.http.middleware);
server.listen(config.get('port'));

// start socketstream
ss.start(server);











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


