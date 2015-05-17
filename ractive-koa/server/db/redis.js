'use strict';

var config = require('../config');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var redisStore;

module.exports = {

	connect: function(ss) {

		var redisConfig = config.get('redis');

		// ss.session.store.use('redis', redisConfig);
		redisStore = new RedisStore(redisConfig);
		ss.session.store.use(redisStore);
		ss.publish.transport.use('redis', redisConfig);
		ss.session.options.maxAge = 1000 * 60 * 60 * 24 * 30; // one month

		console.log('REDIS connected...'.green);

	}

};
