$(document).ready(function() {
	// go top button
	$('#gotop').hide();
	$(window).scroll(function() {
	    if ($(window).scrollTop() > 60) {
	        $('#gotop').fadeIn(300);
	    } else {
	        $('#gotop').fadeOut(300);
	    }
	});
	$('#gotop').click(function() {
	    $('body, html').animate({
	        scrollTop: 0
	    }, 400);
	});
	// show and hide
	var show_hide = $(".menubar .menulist, .menubar span");
	$(".more").hover(function(e) {
		var ev = e.target;
		if (ev) {
			setTimeout(function() {
				show_hide.fadeIn(300);
			}, 500);
		}
	}, function() {
		setTimeout(function() {
			show_hide.fadeOut(300);
		}, 1000);
	});

	// show_hide QRCode
	$("#wechat").click(function() {
		$(".wechat_QRCode").animate({
			top: "20%"
		}, 400);
		$(".bg").fadeIn(100);
		setTimeout(function() {
			$(".close_btn").fadeIn(200);
		}, 400);
	});
	$(".close_btn").click(function() {
		$(".close_btn").fadeOut(200);
		setTimeout(function(){
			$(".wechat_QRCode").animate({
				top: "-40%"
			}, 400);
			$(".bg").fadeOut(100);
		}, 200);
		
	});

	// Carousel figure
});