
// - - - - - - - - - - - - - - - - - - - - - - - - >>>>> vars

// var ssStylus, ractiveOptions = {};
var http = require('http');
var ss = require('socketstream');
var ssJade = require('ss-jade');

var config = require('./server/services/config');
// console.log(config.get('port'));
// var dbService = require('./server/services/db');

// - - - - - - - - - - - - - - - - - - - - - - - - >>>>> db services

// dbService.connectMongoose();
// dbService.connectRedis();

// - - - - - - - - - - - - - - - - - - - - - - - - >>>>> ROUTES

// require('./server/services/routes')(ss);

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

// Code Formatters
ss.client.formatters.add(require('ss-jade'));
ss.client.formatters.add(require('ss-stylus'));

// Use server-side compiled Hogan (Mustache) templates. Others engines available
// ss.client.templateEngine.use(require('ss-hogan'));

// Minimize and pack assets if you type: SS_ENV=production node app.js
if (ss.env === 'production') {
	ss.client.packAssets();
}

// Start web server
var server = http.Server(ss.http.middleware);
server.listen(config.get('port'));

// Start SocketStream
ss.start(server);

