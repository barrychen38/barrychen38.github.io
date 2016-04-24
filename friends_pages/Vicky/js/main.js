// preload
function loadEvent(obj) {
	var queue = new createjs.LoadQueue(true);
	queue.on('progress', obj.handProgress, this);
	queue.on('complete', obj.handComplete, this);
	queue.loadManifest(obj.que);
}
loadEvent({
	que: [
		"img/v1.jpg",
		"img/v2.jpg"
	],
	handProgress: function(e) {
		var a = parseInt(e.loaded * 100);
		$('.progress').html(a);
	},
	handComplete: function() {
		// $('.loadingMask').fadeOut(500);
	}
});
// load complete
$(function(){
	$('#heart').addClass('jump');
});