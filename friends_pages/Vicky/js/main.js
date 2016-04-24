// preload
function loadEvent(obj) {
	var queue = new createjs.LoadQueue(true);
	queue.on('progress', obj.handProgress, this);
	queue.on('complete', obj.handComplete, this);
	queue.loadManifest(obj.que);
}
loadEvent({
	que: [
		"img/big_heart.png",
		"img/v1.jpg",
		"img/adidas1.png",
		"img/adidas2.png",
		"img/adidas3.png"
	],
	handProgress: function(e) {
		var a = parseInt(e.loaded * 100);
		$('.progress').html(a);
	},
	handComplete: function() {
		$('.loadingMask').fadeOut(500);
		setTimeout(function() {
			$('#box1').addClass('boxShake')
		}, 1000);
	}
});
// load complete
$(function(){
	$('#heart').addClass('jump');
	// touch box 
	$('#box1')[0].ontouchend = function() {
		$('.step1').fadeOut(500);
		setTimeout(function() {
			$('.step2').fadeIn(500);
		}, 500);
	}
	$('#box2')[0].ontouchend = function() {
		$('.step2').fadeOut(500);
		setTimeout(function() {
			$('.step3').fadeIn(500);
		}, 500);
	}
});