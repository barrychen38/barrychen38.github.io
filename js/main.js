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
