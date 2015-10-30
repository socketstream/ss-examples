// My SocketStream 0.5 app

var ss = require('socketstream'),
	connect = require('connect'),
	compression = require('compression'),
	bodyParser = require('body-parser'),
	app = ss.http.middleware = connect(),
	path = require('path');

var config = {
	sessionSecret: 'not much of a secret'
};

// gzip/deflate outgoing responses
app.use(compression());

// parse urlencoded request bodies into req.body
app.use(bodyParser.urlencoded());

// app.use('/',ss.http.middleware);
app.use(ss.http.session.middleware);
app.use(ss.http.cached.middleware);

// respond to all requests
app.use(function(req, res){
	res.end('Hello from Connect!\n');
});

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
if (ss.env === 'production') {
	ss.client.packAssets();
	app.locals.cache = 'memory';
}	

// direct call just starts the server (unless running with gulp)
ss.start();
