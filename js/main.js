console.log('I am Adobe.');

// preload images
var images = [];
function preloadImg() {
	for (var i = 0; i < arguments.length; i++) {
		images[i] = new Image();
		images[i].src = arguments[i];
	} 
}
preloadImg("img/QRcode.png");

// go top
$(window).scroll(function(event) {
	if ($(this).scrollTop() >= 60) {
		$(".gotop").fadeIn(300);
	} else {
		$(".gotop").fadeOut(300);
	}
});
$(".gotop").click(function(event) {
	event.preventDefault();
	$("html, body").animate({'scrollTop': 0}, 300);
});

$(function() {
	// show wechat QRCode
	var timer, timer_show;
	$(".wechat").hover(function() {
		clearTimeout(timer);
		timer = setTimeout(function() {
			$(".qrcode").fadeIn(300);
		}, 200);}, function() {
		clearTimeout(timer);
		timer_show = setTimeout(function() {
			$(".qrcode").fadeOut(300);
		}, 300);
	});
	$(".qrcode").hover(function() {
		clearTimeout(timer_show);
		$(".qrcode").show();
	}, function() {
		setTimeout(function() {
			$(".qrcode").fadeOut(300);
		}, 300);
	});
});
