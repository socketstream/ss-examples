'use strict';

var mongoose = require('mongoose');
// var bcrypt = require('bcrypt');

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
	}

};

User = mongoose.model('User', userSchema);



// userSchema.methods.enroll = function(options, cb) {
// 	User.findOne(options.id).exec(function(err, theUser) {
// 		if (err) {
// 			return cb(err);
// 		}
// 		if (!theUser) {
// 			return cb(new Error('User not found.'));
// 		}
// 		theUser.enrolledIn.add(options.courses);
// 		theUser.save(cb);
// 	});
// };



module.exports = {

	userSchema: userSchema,

	User: User,


	// // lifecycle methods
	// beforeCreate: function(values, next) {
	// 	// TODO: check to make sure password and passwordCreate are identical,
	// 	// TODO: I may have to write a service for this
	// 	// SEE: http://stackoverflow.com/questions/25183819/sails-js-calling-one-controller-action-from-another-and-passing-additional-param
	// 	bcrypt.genSalt(10, function(err, salt) {
	// 		if (err) {
	// 			return next(err);
	// 		}
	// 		bcrypt.hash(values.password, salt, function(err, hash) {
	// 			if (err) {
	// 				return next(err);
	// 			}
	// 			values.password = hash;
	// 			next();
	// 		});
	// 	});
	// }

};