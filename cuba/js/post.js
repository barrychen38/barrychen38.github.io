$(function() {
	
	$.ajax({
		url: 'api/index.php',
		type: 'POST',
		dataType: 'json',
		data: {
			openid: openid,
			city: city,
			utm_source: utm_source
		},
	});
	
});