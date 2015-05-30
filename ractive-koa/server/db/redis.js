'use strict';

var config = require('../config');

module.exports = {

	connect: function(ss) {

		var redisConfig = config.get('redis');

		ss.session.store.use('redis', redisConfig);
		ss.publish.transport.use('redis', redisConfig);
		ss.session.options.maxAge = 1000 * 60 * 60 * 24 * 30; // one month

		console.log('REDIS connected...'.green);

	}

};
