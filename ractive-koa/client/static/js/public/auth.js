$(function() {

	$('#joinForm').on('submit', function() {
		// TODO: throw in some happy.js validation
		$.ajax({
			url: '/api/join',
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

	$('#signinForm').on('submit', function() {
		// TODO: throw in some happy.js validation
		$.ajax({
			url: '/api/signin',
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

	$('#signout').on('click', function() {
		$.ajax({
			url: '/api/signout',
			type: 'GET'
		}).done(function(data) {
			window.location = '/';
		}).fail(function(res) {
			console.log('Error: ' + res.getResponseHeader('error'));
		});
	});

	$.ajax({
		url: '/api/session',
		type: 'GET'
	}).done(function(session) {
		console.log(session)
	}).fail(function(res) {
		console.log('Error: ' + res.getResponseHeader('error'));
	});

});
