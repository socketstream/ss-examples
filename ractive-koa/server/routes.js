'use strict';

// var config = require('./config');

module.exports = function(ss, app, router) {

	require('./routes/middleware')(ss, app, router);
	require('./routes/ss')(ss, app, router);
	require('./routes/auth')(ss, app, router);

};
