'use strict';

// >> CONFIGURATION
// >> include this file for access to (`.get/.set`) configuration variables

var key;
var nconf = require('nconf');
var env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
var config = {
	env: env
};
var configFile;

// load commandline arguments and environment variables
nconf.argv().env();

try {
	// load any additional configuration
	// NOTE: as this runs only once at start up,
	// it's fine to run synchronous `try/catch` code
	configFile = require('./config/' + env);
	for (key in configFile) {
		config[key] = configFile[key];
	}
	nconf.defaults(config);
} catch (warning) {
	// console.log(String(warning).yellow);
	console.log('No config file found. Is this correct? -- warning only; it\'s not required; environment variables are required.'.yellow);
}

module.exports = nconf;
