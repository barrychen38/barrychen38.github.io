define(['./fn', './data', 'cjs', 'wx'], function(F, data) {
	
	var cjs = createjs || {},
		Cartier = new F.fn(),
		stage = F.stage,
		// w = F.width,
		// h = F.height,
		loader = F.loader;
	
	var Hammer = require('hammer');
	// delete Hammer.defaults.cssProps.userSelect;
	
	console.info('VERSION: ' + Cartier.VERSION);
	
	var assets = assets || {},
		view = $('#view')[0];
	
	var loop_rate = 0.25,
		rate = 15,
		which_page = 1,
		back_prev = $('<img>'),
		init_con = {x: 0, y: 0},
		init_con_inner = {x: 0, y: 0, alpha: 0};
	
	var gesture = new Hammer.Manager(view),
		pinch = new Hammer.Pinch({
			// event: 'pinchout',
			// threshold: 0,
			pointers: 2
		}),
		swipeRight = new Hammer.Swipe({
			// event: 'swiperight',
			direction: Hammer.DIRECTION_ALL
		});
		// pinchIn = new Hammer.Pinch({
			// event: 'pinchin',
			// threshold: 0,
			// pointers: 2
		// });
	// var singleTap = new Hammer.Tap();
	
	// gesture.add([singleTap]);
	
	// pinchOut.requireFailure(pinchIn);
	// pinchIn.requireFailure(pinchOut);
	
	var loading_container = Cartier.con(init_con_inner),
		p1_container = Cartier.con(init_con_inner),
		p1_container_inner = Cartier.con(init_con),
		p2_container = Cartier.con(init_con_inner),
		p2_container_inner = Cartier.con(init_con),
		p3_container = Cartier.con(init_con_inner),
		p3_container_inner = Cartier.con(init_con),
		p4_container = Cartier.con(init_con_inner);
	
	cjs.Touch.enable(stage);
	cjs.Ticker.addEventListener('tick', stage);
	// createjs.Ticker.setFPS(20);
	cjs.Ticker.timingMode = cjs.Ticker.RAF;
	
	loader.loadManifest(data.queue);
	loader.on('fileload', handleLoad);
	loader.on('complete', p1_animation);
	
	// back rto previous
	back_prev.attr({
		'src': 'assets/p2/back.jpg',
		'class': 'back-prev'
	});
	$(document.body).append(back_prev);
	back_prev.on('click', function() {
		console.log('current_page: ' + which_page);
		if (which_page === 2) {
			$(this).removeAttr('style');
			$(this).remove();
			// page2 remove
			p2_container.removeAllChildren();
			p2_container_inner.removeAllChildren();
			stage.removeChild(p2_container, assets.logo);
			assets.p2_sprite.gotoAndPlay(0);
			assets.p2_sprite.framerate = rate;
			assets.p2_sprite.removeAllEventListeners();
			gesture.off('swiperight');
			p2_container.alpha = 0;
			// page1 recover
			p1_container_inner.alpha = 1;
			p2_container_inner.alpha = 1;
			p1_animation();
			which_page = 1;
		}
		if (which_page === 3) {
			// page3 remove
			p3_container.removeAllChildren();
			p3_container_inner.removeAllChildren();
			stage.removeChild(p3_container);
			assets.p3_sprite.gotoAndPlay(0);
			assets.p3_sprite.framerate = rate;
			assets.p3_sprite.removeAllEventListeners();
			gesture.off('pinchin');
			p3_container.alpha = 0;
			// page2 recover
			p2_container_inner.alpha = 1;
			p3_container_inner.alpha = 1;
			p2_animation();
			which_page = 2;
		}
	});
	
	function handleLoad() {
		var loaded = loader._numItemsLoaded - 2,
			all = loader._numItems - 2;
		
		if (loader._numItemsLoaded === 2) {
			loading();
		}
		if (loader._numItemsLoaded > 2) {
			assets.load_bar.scaleX = (loaded / all).toFixed(2);
		}
		
		switch (loader._numItemsLoaded) {
			case 83:
				p1_loaded();
				break;
			case 141:
				p2_loaded();
				break;
			case 203:
				p3_loaded();
				break;
			case 210:
				p4_loaded();
				break;
			default:
				break;
		}
	}
	
	function loading() {
		
		assets.load_logo = Cartier.rb('logo').b.set(data.position.load.logo);
		assets.load_title = Cartier.rb('title').b.set(data.position.load.title);
		assets.load_w1 = new cjs.Text('卡地亚全新高级珠宝系列展览', '22px Arail', '#fff').set(data.position.load.w1);
		assets.load_bar = new cjs.Shape().set(data.position.load.bar);
		assets.load_bar.graphics.beginFill('#fff').drawRect(0, 0, 515, 2);
		assets.load_bar.scaleX = 0;
		assets.load_w2 = new cjs.Text('正 在 加 载', '21px Arail', '#fff').set(data.position.load.w2);
		
		loading_container.addChild(assets.load_logo, assets.load_title, assets.load_w1, assets.load_bar, assets.load_w2);
		stage.addChild(loading_container);
		
		Cartier.toAlphaOne(loading_container);
		
		document.title = '卡地亚的奇幻魔法，近在咫尺';
		
	}
	
	function p1_loaded() {
		
		assets.p1_images = Cartier.spriteArr('p1_', 75, 36);
		
		assets.logo = Cartier.rb('logo').b.set(data.position.logo);
		assets.logo.alpha = 0;
		
		assets.p1_w1 = Cartier.rb('p1_w1').b.set(data.position.p1.w1);
		
		assets.p1_hand = Cartier.rb('p1_hand').b.set(data.position.hand);
		
		assets.p1_arr1 = Cartier.rb('p1_arr1').b.set(data.position.p1.arr1);
		assets.p1_arr2 = Cartier.rb('p1_arr2').b.set(data.position.p1.arr2);
		
		assets.p1_hw = Cartier.rb('p1_hw').b.set(data.position.hw_123);
		
		assets.p1_sprite = Cartier.sprite(assets.p1_images, 750, 1206, assets.p1_images.length, loop_rate);
		
		Cartier.arrMove(assets.p1_arr1, data.position.p1.arr1_end, data.position.p1.arr1);
		Cartier.arrMove(assets.p1_arr2, data.position.p1.arr2_end, data.position.p1.arr2);
		
	}
	
	function p1_animation() {
		
		stage.removeChild(loading_container);
		$(document.body).append(back_prev);
		gesture.add([pinch]);
		
		Cartier.animation({
			container: p1_container,
			container_inner: p1_container_inner,
			sprite: assets.p1_sprite,
			all_frames: 75,
			loop_frames: 35,
			frame_rate: rate,
			gesture: gesture,
			event: 'pinchout'
			// event: 'tap'
		}, function() {
			p2_animation();
		}, function() {
			console.log('page1 done.');
			which_page = 2;
			p1_container.removeAllChildren();
			p1_container_inner.removeAllChildren();
			stage.removeChild(p1_container);
			back_prev.animate({
				opacity: 1
			}, 360);
			assets.p1_sprite.gotoAndPlay(0);
			assets.p1_sprite.framerate = rate;
			// gesture.get('pinch').set({enable: true});
			gesture.add([swipeRight]);
		});
		
		p1_container_inner.addChild(assets.p1_w1, assets.p1_hand, assets.p1_arr1, assets.p1_arr2, assets.p1_hw);
		p1_container.addChild(assets.p1_sprite, p1_container_inner);
		
		stage.addChild(p1_container);
		
		Cartier.toAlphaOne(p1_container);
		
		stage.addChild(assets.logo);
		
		Cartier.toAlphaOne(assets.logo);
		
	}
	
	function p2_loaded() {
		
		assets.p2_images = Cartier.spriteArr('p2_', 53, 27);
		
		assets.p2_w1 = Cartier.rb('p2_w1').b.set(data.position.p2.w1);
		assets.p2_w2 = Cartier.rb('p2_w2').b.set(data.position.p2.w2);
		
		assets.p2_hand = Cartier.rb('p2_hand').b.set(data.position.hand);
		assets.p2_arr = Cartier.rb('p2_arr').b.set(data.position.p2.arr);
		
		assets.p2_hw = Cartier.rb('p2_wh').b.set(data.position.hw_123);
		
		assets.p2_sprite = Cartier.sprite(assets.p2_images, 750, 1206, assets.p2_images.length, loop_rate);
		
		Cartier.arrMove(assets.p2_arr, data.position.p2.arr_end, data.position.p2.arr);
		
	}
	
	function p2_animation() {
		
		Cartier.animation({
			container: p2_container,
			container_inner: p2_container_inner,
			sprite: assets.p2_sprite,
			sprite_loop: assets.p2_sprite_loop,
			all_frames: 52,
			loop_frames: 26,
			frame_rate: rate,
			gesture: gesture,
			event: 'swiperight'
			// event: 'tap'
		}, function() {
			p3_animation();
		}, function() {
			console.log('page2 done.');
			which_page = 3;
			p2_container.removeAllChildren();
			p2_container_inner.removeAllChildren();
			stage.removeChild(p2_container);
			assets.p2_sprite.gotoAndPlay(0);
			assets.p2_sprite.framerate = rate;
			// gesture.get('swipe').set({enable: true});
			gesture.add([pinch]);
		});
		
		p2_container_inner.addChild(assets.p2_w1, assets.p2_w2, assets.p2_hand, assets.p2_arr, assets.p2_hw);
		p2_container.addChild(assets.p2_sprite, p2_container_inner);
		
		stage.addChild(p2_container, assets.logo);
		
		Cartier.toAlphaOne(p2_container);
		
	}
	
	function p3_loaded() {
		
		assets.p3_images = Cartier.spriteArr('p3_', 54, 22);
		
		assets.p3_w1 = Cartier.rb('p3_w1').b.set(data.position.p3.w1);
		assets.p3_w2 = Cartier.rb('p3_w2').b.set(data.position.p3.w2);
		
		assets.p3_hand = Cartier.rb('p3_hand').b.set(data.position.hand);
		assets.p3_arr1 = Cartier.rb('p3_arr1').b.set(data.position.p3.arr1);
		assets.p3_arr2 = Cartier.rb('p3_arr2').b.set(data.position.p3.arr2);
		assets.p3_arr3 = Cartier.rb('p3_arr3').b.set(data.position.p3.arr3);
		assets.p3_arr4 = Cartier.rb('p3_arr4').b.set(data.position.p3.arr4);
		
		assets.p3_hw = Cartier.rb('p3_wh').b.set(data.position.hw_123);
		
		assets.p3_sprite = Cartier.sprite(assets.p3_images, 750, 1206, assets.p3_images.length, loop_rate);
		
		Cartier.arrMove(assets.p3_arr1, data.position.p3.arr1_end, data.position.p3.arr1);
		Cartier.arrMove(assets.p3_arr2, data.position.p3.arr2_end, data.position.p3.arr2);
		Cartier.arrMove(assets.p3_arr3, data.position.p3.arr3_end, data.position.p3.arr3);
		Cartier.arrMove(assets.p3_arr4, data.position.p3.arr4_end, data.position.p3.arr4);
		
	}
	
	function p3_animation() {
		
		Cartier.animation({
			container: p3_container,
			container_inner: p3_container_inner,
			sprite: assets.p3_sprite,
			sprite_loop: assets.p3_sprite_loop,
			all_frames: 53,
			loop_frames: 21,
			frame_rate: rate,
			gesture: gesture,
			event: 'pinchin'
			// event: 'tap'
		}, function() {
			p4_animation();
		}, function() {
			console.log('page3 done.');
			p3_container.removeAllChildren();
			p3_container_inner.removeAllChildren();
			stage.removeChild(p3_container);
			assets.p3_sprite.gotoAndPlay(0);
			assets.p3_sprite.framerate = rate;
			// gesture.get('pinch').set({enable: true});
		});
		
		p3_container_inner.addChild(assets.p3_w1, assets.p3_w2, assets.p3_hand, assets.p3_arr1, assets.p3_arr2, assets.p3_arr3, assets.p3_arr4, assets.p3_hw);
		p3_container.addChild(assets.p3_sprite, p3_container_inner);
		
		stage.addChild(p3_container, assets.logo);
		
		Cartier.toAlphaOne(p3_container);
		
	}
	
	function p4_loaded() {
		
		assets.p4_intro = Cartier.rb('p4_intro').b.set(data.position.p4.intro);
		assets.jewel = Cartier.rb('jewel').b.set(data.position.p4.jewel);
		assets.qrcode = Cartier.rb('qrcode').b.set(data.position.p4.qrcode);
		assets.p4_hand = Cartier.rb('p4_hand').b.set(data.position.p4.hand);
		assets.p4_circle = Cartier.rb('p4_circle').b.set(data.position.p4.circle);
		assets.p4_wh = Cartier.rb('p4_wh').b.set(data.position.hw_4);
		
		cjs.Tween.get(assets.p4_circle, {loop: true}).to({alpha: 0}, 800, cjs.Ease.linear).to({alpha: 1}, 800, cjs.Ease.linear).wait(500);
		
	}
	
	function p4_animation() {
		
		back_prev.animate({
			opacity: 0
		}, 240, 'linear', function() {
			back_prev.remove();
		});
		
		p4_container.addChild(assets.p4_intro, assets.jewel, assets.qrcode, assets.p4_hand, assets.p4_wh);
		
		stage.addChild(p4_container, assets.logo);
		
		cjs.Tween.get(p4_container).to({alpha: 1}, 360).call(showQRcode);
		
	}
	
	function showQRcode() {
		var base64 = stage.toDataURL(),
			qrcode = $('<img>'),
			back = $('<img>');
		qrcode.attr({
			'src': base64,
			'class': 'qrcode'
		});
		back.attr({
			'src': 'assets/p4/back.jpg',
			'class': 'back'
		});
		p4_container.removeAllChildren();
		p4_container.addChild(assets.p4_circle);
		$(document.body).append(qrcode);
		qrcode.on('touchstart', function(event) {
			event.preventDefault();
		});
		$(document.body).append(back);
		back[0].onload = function() {
			back.animate({
				opacity: 1
			}, 360);
		}
		stage.removeChild(assets.logo);
		back.on('click', function() {
			// console.log(assets);
			qrcode.remove();
			$(this).remove();
			p1_container_inner.alpha = 1;
			p2_container_inner.alpha = 1;
			p3_container_inner.alpha = 1;
			p4_container.alpha = 0;
			// stage.addChild(p4_container, p3_container, p2_container, p1_container);
			p1_animation();
			// gesture.add([pinchOut]);
			// window.location.reload();
		})
	}
	
});