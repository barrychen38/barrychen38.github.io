window.onload = function() {
	var name = "#myCanvas";
	var path = "../img/cover.jpg";
	Caman(name, path);
	var btns = get("btns").getElementsByTagName('span'),
		len = btns.length;
	for (var i = 0; i < len; i++) {
		btns[i].save = i;
		btns[i].onclick = function() {
			for (var j = 0; j < len; j++) {
				btns[j].className = "";
			}
			btns[this.save].className = "selected";
			var eff = btns[this.save].dataset.effect;
			switch (eff) {
				case "Lomo":
					Lomo(name, path);
					break;
				case "Warm":
					Warm(name, path);
					break;
				default:
					break;
			}
		}
	}

	function Lomo(n, p) {
		Caman(n, p, function() {
			this.lomo().render();
		});
	}

	function Warm(n, p) {
		Caman(n, p, function() {
			this.love().render();
		});
	}

	function get(id) {
		return document.getElementById(id);
	}
}