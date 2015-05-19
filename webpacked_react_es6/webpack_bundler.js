
var c = function(){
  console.log.apply(console, arguments);
};

module.exports = function webpackBundler(ss, options){
  var bundler = {};
  bundler.define = function(client, config) {
    return ss.bundler.destsFor(ss, client, options);
  };

  bundler.load = function(){};

  bundler.asset = {
    js: function(path, opts, cb){cb(output)}
  };

  bundler.pack = {
    js: function(cb){cb(output);}
  };

  return bundler;
}