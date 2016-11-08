define(['hammer', 'wx'], function() {
	
	var cjs = createjs || {},
		stage = new cjs.Stage('view'),
		loader = new cjs.LoadQueue(false, 'assets/');
	
	var Fn = function() {},
		p = Fn.prototype;
	
	p.VERSION = '1.0.9';
	
	p.rb = function(id) {
		var result = loader.getResult(id),
			bitmap = new cjs.Bitmap(result);
		return {
			r: result,
			b: bitmap
		}
	}
	
	p.con = function(pos) {
		return new cjs.Container().set(pos);
	}
	
	p.sprite = function(a, w, h, end, speed) {
		var spriteSheet = new cjs.SpriteSheet({
			images: a,
			frames: {width: w, height: h, count: end + 1},
			animations: {
				play: [0, end, 'play', speed]
			}
		});
		return new cjs.Sprite(spriteSheet, 'play');
	}
	
	p.spriteArr = function(page, all, loop) {
		var _s = this,
			source = source || {};
		var loop1 = [],
			loop2 = [],
			loop_all = [];
		for (var i = 1; i <= all; i++) {
			source[page + i] = _s.rb(page + i).r;
			loop_all.push(source[page + i]);
			if (i < loop) {
				loop1.push(source[page + i]);
				loop2.unshift(source[page + i]);
			}
		}
		
		loop1.length = loop2.length = loop - 1;
		
		return loop1.concat(loop2, loop_all);
		
	}
	
	p.animation = function(argus, fn, fn_end) {
		var _container = argus.container,
			_container_inner = argus.container_inner,
			_sprite = argus.sprite,
			// _sprite_loop = argus.sprite_loop,
			_all_frames = argus.all_frames,
			_loop_frames = argus.loop_frames,
			_frame_rate = argus.frame_rate,
			_gesture = argus.gesture,
			_event = argus.event;
		var which_frame,
			sprite_length = _all_frames + _loop_frames * 2 - 2;
		var listener1 = _sprite.on('change', function() {
				which_frame = this.currentFrame;
				// console.log(which_frame);
				if (which_frame === _loop_frames * 2 - 1) {
					this.gotoAndPlay(0);
					this.framerate = _frame_rate;
				}
			}),
			listener2 = _sprite.on('animationend', function() {
				this.off('animationend', listener2);
				this.gotoAndStop(sprite_length);
				cjs.Tween.get(_container).call(fn).wait(120).to({alpha: 0}, 240).call(fn_end);
			});
		
		_gesture.on(_event, function(event) {
			var start_frame;
			_sprite.off('change', listener1);
			if (which_frame <= _loop_frames) {
				start_frame = _loop_frames * 2 - 1 + which_frame;
			} else {
				start_frame = _loop_frames * 4 - which_frame - 1;
			}
			console.log('start_frame: ' + start_frame);
			_sprite.gotoAndPlay(start_frame);
			_sprite.framerate = _frame_rate + 10;
			cjs.Tween.get(_container_inner).wait(800).to({alpha: 0}, 1/(_frame_rate+10)*(sprite_length-start_frame)*1000-1000);
			_gesture.off(_event);
		});
		
	}
	
	p.arrMove = function(target, pos_end, pos) {
		cjs.Tween.get(target, {loop: true}).to(pos_end, 500, cjs.Ease.linear).to(pos, 500, cjs.Ease.linear).wait(300);
	}
	
	p.toAlphaOne = function(target) {
		cjs.Tween.get(target).to({alpha: 1}, 360);
	}
	
	return {
		fn: Fn,
		loader: loader,
		stage: stage
	}
	
});