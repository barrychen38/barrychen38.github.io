if ($(window).width() <= 480) {
	rem(document, window, 320);
}
function rem(doc, win, clientWidthNow) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function() {
			var clientWidth = docEl.clientWidth;
			if (!clientWidth) return;
			docEl.style.fontSize = 50 * (clientWidth / clientWidthNow) + 'px';
		};
	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
}

$(function() {
	
	FastClick.attach(document.body);
	
	var GBE = {
		gqs: function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"),
				r = window.location.search.substr(1).match(reg);
			if (r != null) return decodeURIComponent(r[2]);
			return null;
		},
		bm: function(medium) {
			var media = medium.split('_')[0],
				// what = +medium.match(/[0-9]/g) - 1;
				what = +medium.split('_')[1] - 1;
			return {
				_m: media,
				_w: what
			}
		},
		gf: function(medium) {
			return +medium.match(/[0-9]/g).join('') - 1;
		}
	}
	
	if (GBE.gqs('utm_source') && GBE.gqs('utm_medium')) {
		var source = GBE.gqs('utm_source').toLowerCase(),
			medium = GBE.gqs('utm_medium').toLowerCase();
	}
	
	var basrUrl = 'assets/agegate/qrcode/',
		qrcode = {
			// utm_source
			buymedia: {
				'1pt_1': ['1.png', '1_pc.png'],
				'1pt_2': ['2.png', '2_pc.png'],
				'1pt_3': ['3.png', '3_pc.png'],
				'1pt_4': ['4.png', '4_pc.png'],
				// tianxun: ['5.png', '6.png', '7.png', '8.png'],
				// qunar: ['9.png', '10.png', '11.png', '12.png']
				'3pt_1': ['ctq1.png', 'ctq1_pc.png'],
				'3pt_2': ['ctq2.png', 'ctq2_pc.png'],
				'3pt_3': ['ctq3.png', 'ctq3_pc.png'],
				'3pt_4': ['ctq4.png', 'ctq4_pc.png'],
			},
			// geofencing: ['13.png', '14.png'],
			weibo: ['weibo.png', 'weibo_pc.png'],
			wechatshake: ['15.png', '15_pc.png'],
			ctripwechatad: ['16.png', '16_pc.png'],
			// mb, pc
			ctripemailad: ['17.png', '19.png'],
			// utm_medium
			// mb, pc
			hotelbook: ['18.png', '20.png'],
			blank: ['blank.png', 'blank_pc.png'],
		}
	
	if (source != null && medium != null) {
		
		if (source == 'ctrip' && medium == 'hotelbook') {
			$('.qr').append('<img src="' + basrUrl + qrcode[medium][0] + '">');
			$('.qr_pc').append('<img src="' + basrUrl + qrcode[medium][1] + '">');
		} else {
			if (source == 'buymedia') {
				
				// m = GBE.bm(medium);
				
				$('.qr').append('<img src="' + basrUrl + qrcode[source][medium][0] + '">');
				$('.qr_pc').append('<img src="' + basrUrl + qrcode[source][medium][1] + '">');
				
				// $('.container_pc').css('display', 'none!important');
				// if (m._m === '1pt') {
				// 	$('.qr').append('<img src="' + basrUrl + qrcode[source]['ctrip'][m._w] + '">');
				// } else {
				// 	$('.qr').append('<img src="' + basrUrl + qrcode[source]['ctq'][m._w] + '">');
				// }
			} else {
				// m = GBE.gf(medium);
				// $('.container_pc').css('display', 'none!important');
				$('.qr').append('<img src="' + basrUrl + qrcode[source][0] + '">');
				$('.qr_pc').append('<img src="' + basrUrl + qrcode[source][1] + '">');
			}
		}
		// 
	} else {
		$('.qr').append('<img src="' + basrUrl + qrcode['blank'][0] + '">');
		$('.qr_pc').append('<img src="' + basrUrl + qrcode['blank'][1] + '">');
	}
	
	$('.no').on('click', function() {
		$('.bg').show();
		$('.float').show();
		$('.content').hide();
	});
	
	$('.back').on('click', function() {
		$('.bg').hide();
		$('.float').hide();
		$('.content').show();
	});
	
	var search = window.location.search;
	$('.go_link').attr('href', 'index.html' + search);
	
});