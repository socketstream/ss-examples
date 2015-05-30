'use strict';

var _ = require('lodash');

exports.actions = function(req, res, ss) {

	req.use('session');

	return {

		get: function() {

			if (req.session && req.session.userId) {
				req.session.type = 'existing session';
				console.log(req.session);
				res(req.session);
			} else {
				req.session.setUserId(_.uniqueId());
				req.session.type = 'new session';
				req.session.save(function(err) {
					if (err) {
						res({
							status: 'failure',
							reason: err
						});
					} else {
						console.log(req.session);
						res(req.session);
					}
				});
			}

		}

	};

};
