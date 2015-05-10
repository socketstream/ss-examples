$(function() {

	$('#signupForm').on('submit', function() {
		// TODO: throw in some happy.js validation
		console.log($(this).serialize());
		$.ajax({
			url: '/api/signup',
			type: 'post',
			data: $(this).serialize()
		}).done(function(data) {
			console.log(data);
			// window.location = '/';
		}).fail(function(res) {
			console.log(res);
			console.log('Error: ' + res.getResponseHeader('error'));
			// TODO: deal with incorrect user
		});
		return false;
	});

	$('#loginForm').on('submit', function() {
		// TODO: throw in some happy.js validation
		$.ajax({
			url: '/api/login',
			type: 'post',
			data: $(this).serialize()
		}).done(function(data) {
			window.location = '/';
		}).fail(function(res) {
			console.log('Error: ' + res.getResponseHeader('error'));
			// TODO: deal with incorrect user
		});
		return false;
	});

	$('#logout').on('click', function() {
		$.ajax({
			url: '/api/logout',
			type: 'GET'
		}).done(function(data) {
			window.location = '/';
		}).fail(function(res) {
			console.log('Error: ' + res.getResponseHeader('error'));
		});
	});

});
