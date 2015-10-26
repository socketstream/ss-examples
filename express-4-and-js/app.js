// My SocketStream 0.5 app

var ss = require('socketstream'),
	express = require('express'),
  	compression = require('compression'),
  	favicon = require('serve-favicon'),
	RedisStore = require('connect-redis'),
	conventions = require('conventions'),
	cookieParser = require('cookie-parser'),
	path = require('path');

var config = {
	port: 3000,
	sessionSecret: 'not much of a secret'
};

// Define a single-page client called 'main'
ss.client.define('main', {
  view: 'app.jade',
  css:  ['../node_modules/normalize.css/normalize.css', './css/app.scss'],
  code: ['../node_modules/es6-shim/es6-shim.js', 'libs/jquery.min.js', 'app'],
  tmpl: '*'
});

// Serve this client on the root URL
ss.http.route('/', function(req, res){
  res.serveClient('main');
});

ss.client.formatters.add('sass');
ss.client.formatters.add('jade', {
	basedir: path.join(__dirname,'client','views')
});

// Use server-side compiled Hogan (Mustache) templates. Others engines available
ss.client.templateEngine.use('ss-hogan');

// Minimize and pack assets if you type: SS_ENV=production node app.js
if (ss.env === 'production') {
  ss.client.servePacked();
  ss.session.store.use('redis');
  ss.publish.transport.use('redis');
}
ss.ws.transport.use('sockjs');


/**
 * Start server with config
 *
 * @param config Should be the settings object exported, but can be stubbed or tweaked.
 */
ss.task('start-server', ['load-api'], function(done) { // the load-api dependency may be renamed in neare future
  var app = ss.http.middleware = express();

  //express settings
  app.disable('x-powered-by');
  app.set('port', config.port);
  app.set('views', path.join(__dirname, 'client', 'views'));
  app.locals.basedir = path.join(__dirname, 'client', 'views');
  app.set('view engine', 'jade');

  app.use(compression());
  app.use(favicon(ss.client.faviconPath));

	// require routers
  conventions.routers(__dirname, function(router,name) {
    var defaultBase = path.dirname(name).substring(1);
    app.use(router.baseRoute || defaultBase,router);
  });

  // app.use('/',ss.http.middleware);
  app.use(ss.http.session.middleware);
  app.use(ss.http.cached.middleware);

  // Start SocketStream
  ss.ws.listen(config.port, done);

  console.info('Routers:'.grey, conventions.routers().join(' ').replace(/\.\//g,'').replace(/\.router\.js/g,'') || 'None.');
});

// direct call just starts the server (unless running with gulp)
ss.start();
