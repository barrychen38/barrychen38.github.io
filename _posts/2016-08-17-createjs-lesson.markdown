---
layout: post
title:  "CreateJS Lesson"
date:   2016-08-17 11:23:19 +0800
categories: record study
---

相对来说这可能是一个比较捉急的课程，只是把自己的理解写上去，因为看网上关于 `createjs` 的课程还是比较少的，而且有也只是讲一些基础的用法，官方文档的英文版看起来又吃力，虽然有中文版的官网，但是也有翻译不全的。正好有机会专研了一小段时间，可能讲的不全，自己还有些地方不太懂，但是做个小动画啥的应该不是问题了，所以在这里献丑一下。不懂的还是请戳[这里](http://createjs.com/)吧，嘻嘻。

不喜勿喷，欢迎大神指正。

***

# EaselJS

### 基本用法

首先和大多数其他插件一样，先获得要操作的 *canvas* 再说：

{% highlight js %}
var stage = new createjs.Stage('view'); // 写入 canvas 的 id
{% endhighlight %}

先在 `canvas` 元素之上创建一个舞台，之后一切要表演的东西就都在这个上面了。

然后运用里面封装好的方法就可以随便自己画了，简单代码见 [basic.html](/demo/createjs/basic.html)。

Ps: 几个注意点

* 每次写好一个 `canvas` 元素对象之后都要通过 `addChild` 方法添加到舞台当中去；

* 添加完元素之后都要更新舞台；
* 当然每次手动更新舞台有些麻烦，`createjs` 为我们提供了一个所谓的心跳机制，也就是不断的更新舞台：

{% highlight js %}
createjs.Ticker.addEventListener('tick', stage); // 直接更新舞台，也可以回调
{% endhighlight %}

到这里其实你已经可以绘制简单的图形，更多的图形绘制可以见官网的 [API](http://createjs.com/docs/easeljs/classes/Shape.html)。

### 移动端的触摸事件支持

这个很简单，只要在开始处得到舞台的时候，直接加下面这句代码：

{% highlight js %}
createjs.Touch.enable(stage); // 写入定义获得的舞台
{% endhighlight %}

### 设置 *FPS* 以及 *requestAnimationFrame(RAF)*

说实话，这个也简单，别人封装好了，直接一句代码的事情：

{% highlight js %}
createjs.Ticker.setFPS(20); // 数值一般不需要大于60
createjs.Ticker.timingMode = createjs.Ticker.RAF; // 直接使用RAF
{% endhighlight %}

### 雪碧图动画制作

一般我们会使用关键帧来实现动画，制作成一张 *Sprite* 雪碧图，来减少 *http* 的请求，可能我们自己写的时候，需要不断的来调整位置，而且还要获得很多的位置坐标，麻烦还费时间，`createjs` 提供的方法简直爽爆了，让我们来认识一下：

{% highlight js %}
var ss = new createjs.SpriteSheet({
  framerate: 20, // 可选，帧率
  frames: {width: 217, height: 78, count: 34}, // 一般这三个参数足够，一张雪碧图切割成34张宽217像素和高78像素的单独图片
  animations: {
    play: [0, 33, 'play', 0.25] // 四个参数分别是开始帧数，结束帧数，下一个动作，帧率倍数
  }
});
var s = new createjs.Sprite(ss, 'play'); // 把上面的ss对象加入s对象，并从动作play开始动画
{% endhighlight %}

写完这两个之后，把 `Sprite` 对象添加到舞台当中去之后就能成为一个循环的动画，类似 *gif* 动图。一般这个不需要设置 `RAF` 属性，本身就是帧动画，只要帧数达到一定条件就行。

### 字体的绘制

直接利用封装好的方法：

{% highlight js %}
var text = new createjs.Text("Hello World", "20px Arial", "#ff7700");
{% endhighlight %}

三个参数分别表示需要绘制的字体内容，字体的样式，写法和 *css* 一样，最后一个参数为字体的颜色。

###  容器的使用

还是一样的使用封装好的方法：

{% highlight js %}
var container = new createjs.Container();
{% endhighlight %}

这个元素相当于一个小舞台，具有和舞台相同的功能，可以把 `Shape` 和 `Text` 等加入进去，这样做的好处就是可以同时操作一个元素但是相当于操作一群元素，所有的属性都是容器属性和子元素属性的相加，但是 `alpha` 这个属性是相乘的。

### 图片对象

当然是用它封装好的方法：

{% highlight js %}
var bitmap = new createjs.Bitmap("imagePath.jpg");
{% endhighlight %}

这个函数含有一个参数，可以是一个 *DOM* 对象，也可以是画布、图片或是视频，更简单的就是字符串路径。

如果加载的是跨域的图片资源，会报跨域安全的错误。

### 影片剪辑

这个和精灵图有异曲同工的地方，但是上面的是帧动画的动画，这个是纯粹的 `canvas` 里的图形的动画。 

{% highlight js %}
var mc = new createjs.MovieClip(null, 0, true, {start:20});
stage.addChild(mc);
{% endhighlight %}

它接受四个参数，都是可选的，分别是：

* 模式设置：一般设置成 `null` ，不需要多写
* 开始位置：为 `0` ，基本都是从头开始动画
* 循环设置：动画的循环值为布尔值
* 标签设置：可以自己设定从哪个时间点开始动画

最厉害的就是有一个 `Timeline` 的属性设置，也就是时间线的意思，我们可以在时间线上添加动画，需要用到后续的 *TweenJS* 模块来配合使用：

{% highlight js %}
mc.timeline.addTween(
     createjs.Tween.get(target1)
         .to({x:0}).to({x:60}, 50).to({x:0}, 50));
mc.timeline.addTween(
     createjs.Tween.get(target2)
         .to({x:60}).to({x:0}, 50).to({x:60}, 50));
{% endhighlight %}

我们给这个影片剪辑的时间线添加了两个动画，实现的效果上就是两个物体来回运动，我们可以设置运动的开始播放位置了：

{% highlight js %}
mc.gotoAndPlay('start');
{% endhighlight %}

页面中的动画就会从我们之前设置的时间点开始重复运动了。

***

# TweenJS

这个模块是配合 *EaselJS* 来创建动画的，使用的方法也比较简单，具体代码如下：

{% highlight js %}
createjs.Tween.get(target, {loop:true}).to({x:100}, 500, createjs.Ease.linear);
{% endhighlight %}

具体的参数需要说明一下：

`get` 方法接受两个参数：第一个是我们需要得到的目标，比如之前绘制的长方形啊圆啊还是其他的图形对象；第二个是需要设置动画是否循环。

`to` 方法里面接受三个参数：第一个是动画的终点位置，只要是图形对象上有的属性基本都可以写上去；第二个参数当然是时间，毫秒单位；最后一个参数是我们需要运动的效果，`createjs.Ease` 给我们提供了很多的属性运动，大家可以去官网查找自己想要的效果。

说到这里也差不多，因为本身这个模块的官网 *API* 也不多，我们能用到的暂时也就这点。

PS：另外看到别人写的可以用来播放动画帧的效果，也是需要配合 *EaselJS* 的另外一个方法`MovieClip` ，这个的好处就是不需要每张图片保持一样的大小，和  *EaselJS* 的 `Sprite` 最大的区别。代码如下：

{% highlight js %}
var mc = new createjs.MovieClip(null, 0, true, {start:20});
stage.addChild(mc);
mc.timeline.addTween(createjs.Tween.get({})
    .to({state:[{t:target_1}]})
    .to({state:[{t:target_2}]},3)
    .to({state:[{t:target_3}]},3)
    .to({state:[{t:target_4}]},3)
    .to({state:[{t:target_5}]},3).wait(3));
{% endhighlight %}

事实上我到现在还没有摸索清楚这个写法，为什么这样就可以了呢。里面的 `target` 是需要 *Bitmap* 元素的，而不是 *DOM*  对象。

***

# PreloadJS

### 基本主类

如果需要使用 `canvas` 的话是需要配合 *EaselJS* 来配合使用的，因为我们要绘制到上面去。而我们单纯只是想预加载图片的话直接使用即可，下面说一下其中最重要的几个类及其本身的方法。

这个模块中最重要的一个主类就是 `LoadQueue` 类，它是一个加载的管理者，可以加载单独的文件或者一个文件的队列。初始化的方法如下：

{% highlight js %}
var queue = new createjs.LoadQueue(true);
{% endhighlight %}

这时候我们得到了一个队列，他有两个参数可选，第一个参数是布尔值，默认为 `true` ，默认时资源通过 *XHR* 的形式来加载，貌似时以 *Blob* 的二进制形式来加载，但是当你需要把这个元素加到页面中时，由于图片的 `src` 是二进制格式，在页面中是无法显示的，但是用 `canvas` 显示的话是没有问题的，毕竟这个本身就是用于这个的，所以我们还是把参数设置为 `false` ，这时候就是通过标签的方式来加载资源，加载完之后会把标签删除，很完美，而且图片也是可以加到页面中去的，路径是绝对路径。第二个参数是需要加载的资源的相对根目录路径，当然你也可以在后面图片单独写出。如果加载的是同一个文件夹下的资源，可以在这里直接写出，省的后面多写很多重复的路径。

### 方法

1. loadFile 单独加载一个文件
2. loadManifest 加载一个队列
3. installPlugin 注册一个插件，一般加载声音资源的时候会用到
4. removeAll 把队列中所有的加载资源移除
5. remove 移除队列中对应的资源

### 事件

1. complete 文件或者队列加载完成后的执行函数
2. error 加载资源出错的执行函数，很少用
3. progress 加载过程中的执行函数
4. fileload 单独文件加载完成后的执行函数
5. fileprogress 单独文件加载过程中的执行函数

### 属性

这边说一下新建队列的一些属性：

1. _numItems 队列中所有资源的数目
2. _numItemsLoaded 当前资源加载的数目

用这两个参数可以算出加载的百分比了，当然我们还有一个更简单的方法，就是直接监听 `progress` 事件，该执行函数中有一个 `event` 参数，该参数中有一个属性 `loaded` ，这个值是当前加载资源的小数百分比。

***

介绍到这里，这个模块基本上已经差不多可以自己使用了，更多的探索还是需要自己去慢慢探索，因为本人也是初学者，还在学习当中，所以大家有什么问题可以去[官网](http://createjs.com/docs/preloadjs/modules/PreloadJS.html)多看看，写的比我清楚多了。当然我这里自己也写了一个[demo](/demo/createjs/preload.html)，大家可以参考下，希望大家用的愉快。