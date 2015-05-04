'use strict';

var mongoose = require('mongoose');
var config = require('../config');

// var Schema = mongoose.Schema,
// var ObjectId = Schema.ObjectId;

var connection;

module.exports = {

	connect: function(ss) {

		if(connection) {
			return connection;
		} else {
			connection = mongoose.createConnection(config.get('mongodb'));
			connection.on('error', function() {
				console.error(' * * * MONGODB CONNECTION ERROR * * * '.red.inverse);
				return false;
			});
			return connection.once('open', function() {
				console.log('MongoDB connected via Mongoose...'.green);
				ss.api.add('db', connection);
			});
		}

	},

	// useModel: function(modelName, state) {
	// 	return require(rootDir + '/server/models/' + modelName + '-model')(mongoose, db, Schema, ObjectId);
	// }

};
