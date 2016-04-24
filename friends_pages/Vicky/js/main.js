var fileLoad = {
	que: [
		"img/v1.jpg",
		"img/v2.jpg"
	],
	handProgress: function(e) {
		var a = parseInt(e.loaded * 100);
		$('progress').html(a);
	},
	handComplete: function() {
		$('loadingMask').fadeOut(500);
	}
}
var queue = new createjs.LoadQueue(true);
queue.on('progress', fileLoad.handProgress, this);
queue.on('complete', fileLoad.handComplete, this);
queue.loadManifest(fileLoad.que);

$(function(){
	
	$('#heart').addClass('jump');
	
});