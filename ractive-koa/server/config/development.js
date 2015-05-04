'use strict';

module.exports = {

	version: '0.0.1',
	name: 'demo',
	port: 4444,
	session: {
		secret: 'mcJu*(93_0LA4z6rWEgBw8{N3A"1-+xk2e-EiK[JmQl5*DgMmJ'
	},
	mongodb: 'mongodb://localhost/koa-ractive',
	redis: {
		host: 'localhost',
		port: 6379,
		password: '',
		database: 'koa-ractive'
	}

};
