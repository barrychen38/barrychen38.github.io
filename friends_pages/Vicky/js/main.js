var fileLoad = {
	que: [
		"img/UptownFunk.mp3"
	],
	handProgress: function(e) {
		$('progress').text(e.loaded);
	},
	handCompelete: function() {
		$('loadingMask').fadeOut(500);
	}
}

var queue = new createjs.LoadQueue(true);
queue.on('progress', fileLoad.handProgress, this);
queue.on('complete', fileLoad.handCompelete, this);
queue.loadManifest(fileLoad.que);

$(function(){
	
	$('#heart').addClass('jump');
	
});