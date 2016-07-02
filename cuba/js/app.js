var stage, w, h,
	queue1, queue2, queue3,
	loadFirstFiles, files, barFiles,
	bg1, spark, btn1, age, mask, yes, no,
	bg2, bars, bar1, bar2, bar3, bar4, mark, bd1, bd2, bd3, bd4;
	
var pos = [
	{ x: 80, y: 410 },
	{ x: 480, y: 260 },
	{ x: 80, y: 700 },
	{ x: 500, y: 570 }
];

loadFirstFiles = [
	{id: 'a', src: 'img/s/bg.jpg'},
	{id: 'b', src: 'img/s/spark.png'},
	{id: 'c', src: 'img/s/iwantgo.png'},
	{id: 'd', src: 'img/age/age.png'},
	{id: 'e', src: 'img/logo.png'}
];

files = [
	{id: 'a', src: 'img/b/bg.jpg'},
	{id: 'b', src: 'img/b/bar1.png'},
	{id: 'c', src: 'img/b/bar2.png'},
	{id: 'd', src: 'img/b/bar3.png'},
	{id: 'e', src: 'img/b/bar4.png'},
	{id: 'f', src: 'img/b/mark.png'}
];

barFiles = [
	{id: 'a', src: 'img/d/0.jpg'},
	{id: 'b', src: 'img/d/1.jpg'},
	{id: 'c', src: 'img/d/2.jpg'},
	{id: 'd', src: 'img/d/3.jpg'},
	{id: 'e', src: 'img/d/more.png'}
];

stage = new createjs.Stage('view');
w = stage.canvas.width;
h = stage.canvas.height;

createjs.Touch.enable(stage);
stage.enableMouseOver();

queue1 = new createjs.LoadQueue();
queue1.on('complete', handleLoad);
queue1.loadManifest(loadFirstFiles);

queue2 = new createjs.LoadQueue();
queue2.on('complete', handleComplete);

queue3 = new createjs.LoadQueue();
queue3.on('complete', handleDetail);

createjs.Ticker.timingMode = createjs.Ticker.RAF;

function handleLoad() {
	$('body').css('background', '#000');
	var image1 = queue1.getResult('a');
	bg1 = new createjs.Bitmap(image1);
	
	mask = new createjs.Shape().set({alpha: 0.85});
	mask.graphics.beginFill('#000').drawRect(0, 0, w, h);
	
	var image2 = queue1.getResult('b');
	spark = new createjs.Bitmap(image2).set({x:375, y:0});
	
	var image3 = queue1.getResult('c');
	btn1 = new createjs.Bitmap(image3);
	btn1.x = (w - btn1.image.width) >> 1;
	btn1.y = 1010;
	
	var image4 = queue1.getResult('d');
	age = new createjs.Bitmap(image4).set({x:112, y: 370});
	
	var image5 = queue1.getResult('e');
	logo = new createjs.Bitmap(image5);
	logo.x = (w - logo.image.width) >> 1;
	logo.y = 40;
	
	yes = new createjs.Shape().set({x:428, y:728, alpha: 0.01});
	yes.graphics.beginFill('#fff').drawRect(0, 0, 148, 108);
	
	no = new createjs.Shape().set({x:176, y:728, alpha: 0.01});
	no.graphics.beginFill('#fff').drawRect(0, 0, 148, 108);
	
	yes.on('click', handleYes);
	
	no.on('click', function() {
		window.location.replace('');
	});
	
	stage.addChild(bg1, spark, btn1, mask, age, logo, yes, no);
	queue2.loadManifest(files);
	createjs.Ticker.addEventListener('tick', handleTick);
}

function handleYes() {
	stage.removeChild(mask, age, yes, no);
	btn1.on('click', handleMove);
	queue3.loadManifest(barFiles);
}

function handleTick() {
	createjs.Tween.get(spark).to({alpha: 0});
	stage.update();
}

function handleComplete() {
	var image1 = queue2.getResult('a');
	bg2 = new createjs.Bitmap(image1);
	
	var image6 = queue2.getResult('f');
	mark = new createjs.Bitmap(image6);
	
	var image2 = queue2.getResult('b');
	bar1 = new createjs.Bitmap(image2).set({x:-650, y:260});
	
	var image3 = queue2.getResult('c');
	bar2 = new createjs.Bitmap(image3).set({x:760, y:140});
	
	var image4 = queue2.getResult('d');
	bar3 = new createjs.Bitmap(image4).set({x:-610, y:580});
	
	var image5 = queue2.getResult('e');
	bar4 = new createjs.Bitmap(image5).set({x:770, y:370});
	
	bars = [bar1, bar2, bar3, bar4];
	
	for (var i = 0; i < 4; i++) {
		bars[i].save = i;
		bars[i].on('click', function() {
			stage.removeChild(mark);
			mark.set(pos[this.save]);
			stage.addChild(mark);
		});
	}
}

function handleDetail() {
	var image1 = queue3.getResult('a');
	bd1 = new createjs.Bitmap(image1);
	
	var image2 = queue3.getResult('b');
	bd2 = new createjs.Bitmap(image2);
	
	var image3 = queue3.getResult('c');
	bd3 = new createjs.Bitmap(image3);
	
	var image4 = queue3.getResult('d');
	bd4 = new createjs.Bitmap(image4);
	
	var image5 = queue3.getResult('e');
	more = new createjs.Bitmap(image5);
	more.x = (w - more.image.width) >> 1;
	more.y = 1040;
	
	bar1.on('click', function() {
		setTimeout(function() {
			stage.addChild(bd1, more);
			$('#intro0').show();
			stage.removeChild(bar1, bar2, bar3, bar4, mark);
		}, 500);
	});
	
	bar2.on('click', function() {
		setTimeout(function() {
			stage.addChild(bd2, more);
			$('#intro1').show();
			stage.removeChild(bar2, bar1, bar3, bar4, mark);
		}, 500);
	});
	
	bar3.on('click', function() {
		setTimeout(function() {
			stage.addChild(bd3, more);
			$('#intro2').show();
			stage.removeChild(bar3, bar2, bar1, bar4, mark);
		}, 500);
	});
	
	bar4.on('click', function() {
		setTimeout(function() {
			stage.addChild(bd4, more);
			$('#intro3').show();
			stage.removeChild(bar4, bar2, bar3, bar1, mark);
		}, 500);
	});
	
	more.on('click', function() {
		document.title = '玩转四场夏日古巴风情派对，一起嗨Fun一夏！';
		$('.container').hide();
		$('.share').show();
	});
}

function handleMove() {
	stage.addChild(bg2, bar3, bar4, bar1, bar2);
	stage.removeChild(btn1);
	createjs.Tween.get(bar1).to({x:-150}, 600, createjs.Ease.quintInOut);
	createjs.Tween.get(bar2).to({x:340}, 600, createjs.Ease.quintInOut);
	createjs.Tween.get(bar3).wait(500).to({x:-110}, 600, createjs.Ease.quintInOut);
	createjs.Tween.get(bar4).wait(500).to({x:370}, 600, createjs.Ease.quintInOut);
}