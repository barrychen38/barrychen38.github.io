window.onload = function() {
	
	var love = document.getElementById('love');
	
	var image = [];
	
	var width = document.body.clientWidth;
	
	var preload = new Image();
	preload.src = 'HaP.png';
	preload.onload = function() {
		randomColor();
		randomDrop();
	}
	
	function randomColor() {
		var r = Math.floor(Math.random() * 255),
			g = Math.floor(Math.random() * 255),
			b = Math.floor(Math.random() * 255);
		love.style.color = 'rgb(' + r + ',' + g + ',' + b + ')';
		setTimeout(randomColor, 80);
	}
	
	function randomDrop() {
		for(var i = 0; i < 100; i++) {
			image[i] = new Image();
			image[i].src = 'HaP.png';
			document.body.appendChild(image[i]);
			image[i].style.top = -Math.floor(Math.random() * 1200) + 'px';
			image[i].style.left = Math.floor(Math.random() * width) + 'px';
			var delay = Math.floor(Math.random() * 100);
			image[i].className = 'drop';
		}
	}
	
}