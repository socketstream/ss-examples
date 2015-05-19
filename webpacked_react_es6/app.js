var c = function() {
  console.log.apply(console, arguments);
}

c('here');

var webpack_bundler = require('./webpack_bundler.js');

var t = require('socketstream'); var http = require('http');

t.client.define('basic', webpack_bundler, {
  view: 'basic.html',
  code: ['app']
});

t.http.route('/', function(req, res){
  c(Object.keys(req));
  res.serveClient('basic');
});

t.session.store.use('redis'); t.publish.transport.use('redis');

var server = http.createServer(t.http.middleware);

t.start(server);

process.on('uncaughtException', function(e){
  c('Exception caught', e);
});

var port = 3000;
server.listen(port);

setInterval(function(){
  t.api.publish.all("metronome", Math.random())
}, 2200);