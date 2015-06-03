'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var User;

var userSchema = mongoose.Schema({

	username: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true,
		minLength: 8
	},
	email: {
		type: String,
		unique: true,
		required: true,
		// FIXME: careful about the requirements for a validate email address!
		// http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
		// https://www.google.com/search?q=RFC822&oq=RFC822&aqs=chrome..69i57j0l5.254j0j4&sourceid=chrome&es_sm=91&ie=UTF-8
		validate: function(email) {
			var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
			return regex.test(email);
		}
	},
	first: {
		type: String,
		// defaultsTo: ''
	},
	last: {
		type: String,
		// defaultsTo: ''
	},
	// ???????
	// phone,
	// age,
	// birth,

});

userSchema.pre('save', function(next) {
	// only hash the password if it has been modified (or is new)
	if (!this.isModified('password')) {
		return next();
	}
	// TODO: check to make sure password and passwordCreate are identical,
	bcrypt.genSalt(10, function(err, salt) {
		if (err) {
			return next(err);
		}
		bcrypt.hash(this.password, salt, function(err, hash) {
			if (err) {
				return next(err);
			}
			this.password = hash;
			next();
		}.bind(this));
	}.bind(this));
});

userSchema.methods = {

	speak: function() {
		var greeting = this.username ? 'Meow username is ' + this.username : 'I don\'t have a username';
		console.log(greeting);
	},

	// attribute methods
	getName: function() {
		return this.first + ' ' + this.last;
	},

	getUser: function() {
		return {
			username: this.username,
			email: this.email,
			first: this.first,
			last: this.last,
			name: this.getName()
		};
	},

	validatePassword: function(password, cb) {
		bcrypt.compare(password, this.password, function(err, res) {
			if (typeof cb === 'function') {
				cb(err, res);
			} else {
				return res;
			}
		});
	}

};

User = mongoose.model('User', userSchema);

module.exports = {
	userSchema: userSchema,
	User: User
};
