'use strict';

module.exports = {

	isLoggedIn: function*(next) {
		if (this.req.session.userId) {
			yield next;
		} else {
			// console.log('not logged in: kill it and redirect!!!'.magenta);
			this.redirect('/signin');
			this.status = 302;
			// yield next;
		}
	},

	isLoggedOut: function*(next) {
		if (!this.req.session.userId) {
			yield next;
		} else {
			// console.log('not logged out: kill it and redirect!!!'.magenta);
			this.redirect('/');
			this.status = 302;
			// yield next;
		}
	}

};
