$(document).ready(function() {
	// go top button
	$('.gotop').hide();
	$(window).scroll(function() {
	    if ($(window).scrollTop() > 60) {
	        $('.gotop').fadeIn(300);
	    } else {
	        $('.gotop').fadeOut(300);
	    }
	});
	$('.gotop').click(function() {
	    $('body, html').animate({
	        scrollTop: 0
	    }, 400);
	});
});
