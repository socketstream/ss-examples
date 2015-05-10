'use strict';

var config = require('../config');
var mongoose = require('mongoose');
var db;

module.exports = {

	connect: function(ss) {
		if(db) {
			return db;
		} else {
			mongoose.connect(config.get('mongodb'));
			if (config.get('env') === 'development') {
				mongoose.set('debug', true);
			}
			db = mongoose.connection;
			db.on('error', function() {
				console.error(' * * * MONGODB CONNECTION ERROR * * * '.red.inverse);
				return false;
			});
			db.once('open', function() {
				console.log('MongoDB connected via Mongoose...'.green);
				ss.api.add('db', db);
			});
		}
	},

	// useModel: function(modelName, state) {
	// 	return require(rootDir + '/server/models/' + modelName + '-model')(mongoose, db, Schema, ObjectId);
	// }

};
