console.log('This is Chen38.');
window.onload = function () {
//    var goTop = document.getElementById('gotop');
//	var clientHeight = document.documentElement.clientHeight;
//    var timer = null;
//    var stop = true;
//
//    window.onscroll = function () {
//		var disTop = document.documentElement.scrollTop || document.body.scrollTop;
//		if(disTop >= clientHeight) {
//			goTop.style.display = 'block';
//		} else {
//			goTop.style.display = 'none';
//		}
//        if(!stop){
//            clearInterval(timer);
//        }
//        stop = false;
//    }
//    
//    window.onmousewheel = function () {
//        if(!stop){
//            clearInterval(timer);
//        }
//        stop = false;
//    }
//	
//	goTop.onmouseover = function () {
//		this.innerHTML = "up";
//	}
//	
//	goTop.onmouseout = function () {
//		this.innerHTML = "go";
//	}
//
//    goTop.onclick = function () {
//        timer = setInterval(function () {
//            var disTop = document.documentElement.scrollTop || document.body.scrollTop;
//            var speed = Math.floor(-disTop / 10);
//            document.documentElement.scrollTop = document.body.scrollTop = disTop + speed;
//            stop = true;
//            if (disTop == 0) {
//                clearInterval(timer);
//            }
//        }, 10);
//    }
	
	$('#gotop').hide();
	$(window).scroll( function(){
		if($(window).scrollTop() > 60) {
			$('#gotop').fadeIn(300);
		} else {
			$('#gotop').fadeOut(300);
		}
	});
	$('#gotop').click(function(){
		$('body, html').animate({
			scrollTop: 0
		}, 500);
	});
}