$(function() {
	console.info('I am Adobe.');
	// go top
	var $gotop = $(".gotop");
	var $currentWidth = $(window).width();
	if ($currentWidth <= 980) {
		$gotop.hide();
	} else {
		$(window).scroll(function(event) {
			if ($(this).scrollTop() >= 60) {
				$gotop.fadeIn(300);
			} else {
				$gotop.fadeOut(300);
			}
		});
	}
	$gotop.click(function(event) {
		event.preventDefault();
		$("html, body").animate({'scrollTop': 0}, 300);
	});
	// show wechat QRCode
	var $qrcode = $(".qrcode");
	var timer, timer_show;
	$(".wechat").hover(function() {
		clearTimeout(timer);
		timer = setTimeout(function() {
			$qrcode.fadeIn(300);
		}, 200);}, function() {
		clearTimeout(timer);
		timer_show = setTimeout(function() {
			$qrcode.fadeOut(300);
		}, 300);
	});
	$qrcode.hover(function() {
		clearTimeout(timer_show);
		$qrcode.show();
	}, function() {
		setTimeout(function() {
			$qrcode.fadeOut(300);
		}, 300);
	});
});