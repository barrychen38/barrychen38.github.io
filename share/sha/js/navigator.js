$(function() {
	
	var navigator = window.navigator.userAgent;
	
	if (!isWechat()) {
		
		$('.rm').css('margin-top', '0.1rem!important');
		
		$('.warn').css('margin-top', '0.13rem!important');
		
		if (navigator.match(/(Android)/gi)) {
			$('.content').css('font-size', '6px');
		}
		
		$('.map_img').addClass('center');
		$('.map_img').css({'width': '87%!important', 'margin-top': '0.4rem'});
		
	} else {
		if (navigator.match(/(Android)/gi) || navigator.match(/(Linux)/gi)) {
			$('.qr img').addClass('android');
		}
	}
	
	function isWechat() {
		
		if (navigator.match(/(MicroMessenger)/gi)) {
			return true;
		}
		
		return false;
		
	}
	
});