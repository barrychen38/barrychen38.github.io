$(function() {
	
	FastClick.attach(document.body);
	
	if (gqs('utm_source') && gqs('utm_medium')) {
		var source = gqs('utm_source').toLowerCase(),
			medium = gqs('utm_medium').toLowerCase();
	}
	
	var basrUrl = 'assets/index/brcode/',
		src = {
			ctripemailad: ['confirm_5cl.png', 'confirm_35cl.png'],
			hotelbook: ['hotelbooking_5cl.png', 'hotelbooking_35cl.png'],
			ctripwechatad: ['wechatad_5cl.png', 'wechatad_35cl.png'],
			wechatpost: ['wechatad_5cl.png', 'wechatad_35cl.png'],
			// geofencing: ['geofen_5cl.png', 'geofen_35cl.png'],
			weibo: ['wechatad_5cl.png', 'wechatad_35cl.png'],
			wechatshake: ['jcd_5cl.png', 'jcd_35cl.png'],
			buymedia: ['program_5cl.png', 'program_35cl.png']
		};
	
	if (source != null && medium != null) {
		if (source == 'ctrip' && medium == 'hotelbook') {
			$('.code1').append('<img src="' + basrUrl + src[medium][0] + '">');
			$('.code2').append('<img src="' + basrUrl + src[medium][1] + '">');
		} else {
			$('.code1').append('<img src="' + basrUrl + src[source][0] + '">');
			$('.code2').append('<img src="' + basrUrl + src[source][1] + '">');
		}
	} else {
		$('.code1').append('<img src="' + basrUrl + src['buymedia'][0] + '">');
		$('.code2').append('<img src="' + basrUrl + src['buymedia'][1] + '">');
	}
	
	$('.code1').children('img')[0].onload = function() {
		move($('.code1')[0]).x(-300).duration('1s').end();
	}
	
	$('.code2').children('img')[0].onload = function() {
		move($('.code2')[0]).x(-300).duration('1s').end();
	}
	
	$('.terms').click(function() {
		$('.float_terms').show();
		var myScroll = new IScroll('.wrapper', {
			scrollbars: true
		});
		myScroll.refresh();
		$('.bg').show();
		$('.content').hide();
		$('.warn').hide();
	});
	
	$('.close_w')[0].addEventListener('touchstart', function() {
		$('.float_terms').hide();
		$('.bg').hide();
		$('.content').show();
		$('.warn').show();
	}, false);
	
	$('.cm').click(function() {
		$('.map').show();
	});
	
	$('.close').click(function() {
		$('.map').hide();
	});
	
	function gqs(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"),
			r = window.location.search.substr(1).match(reg);
		if (r != null) return decodeURIComponent(r[2]);
		return null;
	}
	
});