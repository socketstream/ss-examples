// My SocketStream 0.5 app

var ss = require('socketstream'),
	connect = require('connect'),
	RedisStore = require('connect-redis'),
	session = require('express-session'),
	cookieParser = require('cookie-parser'),
	path = require('path');

var config = {
	sessionSecret: 'not much of a secret'
};

ss.http.set({ port:3000 });

// Define a single-page client called 'main'
ss.client.define('main', {
  view: 'app.jade',
  css:  ['../node_modules/normalize.css/normalize.css', './css/app.scss'],
  code: ['../node_modules/es6-shim/es6-shim.js', 'libs/jquery.min.js', 'app'],
  tmpl: '*'
});

// Serve this client on the root URL
ss.http.route('/').serveClient('main');

ss.client.formatters.add('sass');
ss.client.formatters.add('jade', {
	basedir: path.join(__dirname,'client','views')
});

// Use server-side compiled Hogan (Mustache) templates. Others engines available
ss.client.templateEngine.use(require('ss-hogan'));

// Minimize and pack assets if you type: SS_ENV=production node app.js
if (ss.env === 'production') ss.client.packAssets();

/**
 * Start server with config
 *
 * @param config Should be the settings object exported, but can be stubbed or tweaked.
 */
ss.task('application', function() {

  var app = ss.http.middleware = connect();

  // gzip/deflate outgoing responses
  var compression = require('compression')
  app.use(compression())

  // store session state in browser cookie
  var cookieSession = require('cookie-session')
  app.use(cookieSession({
      keys: ['secret1', 'secret2']
  }))

  // parse urlencoded request bodies into req.body
  var bodyParser = require('body-parser')
  app.use(bodyParser.urlencoded())

  // respond to all requests
  app.use(function(req, res){
    res.end('Hello from Connect!\n');
  });

  // app.use('/',ss.http.middleware);
  app.use(ss.http.session.middleware);
  app.use(ss.http.cached.middleware);
});

// direct call just starts the server (unless running with gulp)
ss.start();
