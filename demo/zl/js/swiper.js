/**
 *
 * @authors johnny.jiang
 * @date    2015-03-20 18:20:06
 */
function txtfadeIn(ele,e,speed) {
	i = 0,t = $(ele).text().trim(), p = '';
	var st;
	for (; i < t.length; i++) {
		(function(j) {
			st=setTimeout(function() {
				p += t[j];
				$(e).text(p);
			}, (j + 1) * speed);
		})(i);
	}
}
(function(a) {
	a.fn.touchSwiper = function(j) {
		document.addEventListener('touchmove', function(e) {
		  e.preventDefault();
		});

		var opt = {
			parentele: '.cont',
			ele: ".cont section",
			active: "cur",
			direct: 'vertical', //vertical|horizontal
			min_move_x: 20,
			min_move_y: 20,
			pos: 0,
			end: 0
		};

		var k = 0,i=this,
			d = false,
			g = a(opt.ele).size(),
			f = a(window).height(),
			w = a(window).width(),
			mid;
		if (j) {
			a.extend(opt, j);
			a(opt.ele).css({
				width: w + 'px',
				height: f + 'px'
			});
			if (opt.direct == 'horizontal') {
				a(opt.parentele).css({
					width: w * g + 'px'
				});
				a(opt.ele).css({
					'float': 'left'
				});
			}
		};
		this.each(function() {
			this.addEventListener("touchstart", this, false);
			this.addEventListener("touchmove", this, false);
			this.addEventListener("touchend", this, false);

			this.handleEvent = function(c) {
				switch (c.type) {
					case "touchstart":
						this.onTouchStart(c);
						break;
					case "touchmove":
						this.onTouchMove(c);
						break;
					case "touchend":
						this.onTouchEnd(mid);
						break
				}
			};

			this.removeListener = function() {
				this.removeEventListener("touchmove", this.onTouchMove);
				opt.pos = null;
				d = false
			};
			this.onTouchStart = function(c) {
				opt.pos=opt.end= this.getTouchPoints(c);
				mid=0;
				d = true;
				this.addEventListener("touchmove", this.onTouchMove, false);
			};
			this.onTouchMove = function(m) {
				opt.end = this.getTouchPoints(m);

				if (opt.direct == 'horizontal') {
					mid = opt.end.x - opt.pos.x;
					var midx = mid - k * w;
					i.find('.cont').css({
						"-webkit-transform": "translate3d(" + midx + "px,0, 0)",
						"transform": "translate3d(" + midx + "px,0, 0)",
						'-webkit-transition':'none',
						'transition': 'none'
					});
				} else {
					mid = opt.end.y - opt.pos.y;
					var midy = mid - k * f;
					i.find('.cont').css({
						"-webkit-transform": "translate3d(0," + midy + "px, 0)",
						"transform": "translate3d(0," + midy + "px, 0)",
						'-webkit-transition':'none',
						'transition':'none'
					});
				}
			};

			this.onTouchEnd = function(c) {
				if (opt.direct == 'horizontal') {
					if (Math.abs(c) >= opt.min_move_x) {
						if (c > 0) {
							if (k > 0) {
								k--;
								animateTo(k)
							} else {
								i.find('.cont').css({
									"-webkit-transform": "translate3d(0, 0, 0)",
									"transform": "translate3d(0, 0, 0)",
									'-webkit-transition': ' .5s ease',
									'transition': ' .5s ease'
								});
							}
						} else {
							if (k <= g - 2) {
								k++;
								animateTo(k)
							} else {
								i.find('.cont').css({
									"-webkit-transform": "translate3d(-" + (g - 1) * w + "px,0, 0)",
									"transform": "translate3d(-" + (g - 1) * w + "px, 0,0)",
									'-webkit-transition': ' .5s ease',
									'transition': ' .5s ease'
								});
							}
						}
					} else {
						i.find('.cont').css({
							"-webkit-transform": "translate3d(-" + k * w + "px,0,0)",
							"transform": "translate3d( -" + k * w + "px,0,0)",
							'-webkit-transition': ' .5s ease',
							'transition': ' .5s ease'
						});
					}
				} else {
					if (Math.abs(c) >= opt.min_move_y) {
						if (c > 0) {
							if (k > 0) {
								k--;
								animateTo(k)
							} else {
								i.find('.cont').css({
									"-webkit-transform": "translate3d(0, 0, 0)",
									"transform": "translate3d(0, 0, 0)",
									'-webkit-transition': ' .5s ease',
									'transition': ' .5s ease'
								});
							}
						} else {
							if (k <= g - 2) {
								k++;
								animateTo(k)
							} else {
								i.find('.cont').css({
									"-webkit-transform": "translate3d(0,-" + (g - 1) * f + "px, 0)",
									"transform": "translate3d(0,-" + (g - 1) * f + "px, 0)",
									'-webkit-transition': ' .5s ease',
									'transition': ' .5s ease'
								});
							}
						}
					} else {
						i.find('.cont').css({
							"-webkit-transform": "translate3d(0, -" + k * f + "px, 0)",
							"transform": "translate3d(0, -" + k * f + "px, 0)",
							'-webkit-transition': ' .5s ease',
							'transition': ' .5s ease'
						});
					}
				}
			};

			this.getTouchPoints = function(m) {
				var h = m,
					l = (typeof m.changedTouches != "undefined") ? m.changedTouches : [m],
					c = l[l.length - 1],
					n;
				if (h.type === "pointer") {
					n = {
						x: c.x,
						y: c.y
					}
				} else {
					if (h.type === "touchstart" || h.type == "touchmove") {
						n = {
							x: c.pageX,
							y: c.pageY
						}
					} else {
						n = {
							x: m.pageX,
							y: m.pageY
						}
					}
				}
				return n
			};
			$('.arr,.next,.s1 .img8').on('click',function(){
				if (k <= g - 2) {
					k++;
					animateTo(k)
				}
		    });
			var animateTo = function(e) {
				var m;
				if (opt.direct == 'horizontal') {
					i.find('.cont').css({
						"-webkit-transform": "translate3d( -" + w * e + "px,0, 0)",
						"transform": "translate3d( -" + w * e + "px,0, 0)",
						'-webkit-transition': ' .5s ease',
						'transition': ' .5s ease'
					});
				} else {
					i.find('.cont').css({
						"-webkit-transform": "translate3d(0, -" + f * e + "px, 0)",
						"transform": "translate3d(0, -" + f * e + "px, 0)",
						'-webkit-transition': ' .5s ease',
						'transition': ' .5s ease'
					});
				}
				if (k==g-1) {
					$('.arr').hide();
				}
				else
				{
					$('.arr').show();
				}
				setTimeout(function() {
					a(opt.ele).eq(e).addClass(opt.active).siblings().removeClass(opt.active)
				}, 500);
				
			};
		});
		return this;
	}
})(jQuery);

