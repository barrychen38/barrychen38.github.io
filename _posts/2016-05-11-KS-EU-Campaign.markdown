---
layout: post
title:  "KS EU Campaign"
date:   2016-05-11 22:23:17 +0800
categories: Record Study
---

项目从3月10号正式开始，到4月5日下午5点正式上线。上线之前有一大堆的测试，一大堆的逻辑修改，到上线之前大致上是没有什么问题的，但是上线之后，要加 **tracking code**， 要加 **from**参数（微信自己在分享出去页面链接后面自动加上，用来区分此链接的来源：**Timeline**，**Groupmessage**，**Singlemessage**，最后还是取消，搞的烦死。）。总之是改改改，累累累，但是做完之后也是有一大笔财富经历在里面，觉得可以记录一下。下面写出了在项目中使用的几个小插件的使用方法和遇到的坑。

### [Fabric.js](https://github.com/kangax/fabric.js/)

基于 `canvas` 的图片操作控件，看官方文档就行，源代码的注释里也会有代码案例，可以直接传本地图片的文件路径或者 `base64` 的图片格式。

#### 首先指定需要操作的  `canvas`

{% highlight js %}
var operateCan = new fabric.Canvas(canvasID);
{% endhighlight %}

#### 然后建立基于它的图片对象：

{% highlight js %}
var newImage = new fabric.Image(imageUrl, { // imageUrl => path or base64
  width: '', // width, generally canvas's width
  height: '', // height, generally canvas's height
  originX: '',  // top, right, bottom or left
  originY: '', // top, right, bottom or left
  selectable: , // true or false
  evented: , // true or false
  hasControls: , // true or false
  hasBorders: , // true or false
  hasRotatingPoint:  // true or false
});
{% endhighlight %}

#### 最后把图片对象添加到之前指定的 `canvas` 里

{% highlight js %}
operateCan.add(newImage);
{% endhighlight %}

还有一些基本的操作个人感觉都是封装好的 `canvas` 里的基本操作，类似 `jQuery`，还有就是一些对添加图片的处理，黑白渐变什么的。

`fabric` 对 `canvas` 的处理会是下面的情况：

{% highlight html %}
<div class="canvas-container">
  <canvas id="myCanvas" width="547" height="523" class="lower-canvas"></canvas>
  <canvas class="upper-canvas" width="547" height="523"></canvas>
</div>
{% endhighlight %}

#### 坑

* 自动在你需要操作的 `canvas` 上面建立一个 `div` ，再创建多一个 `canvas` ，`upper-canvas` 其实是用来操作图片的，一旦删除就无法移动，如果需要重复上传照片，它会不断地按照这种方式进行嵌套，为了方便操作，每次还是需要把整个 `div` 删除，然后再自己重新添加 `canvas` 元素，这样就能保证每次上传照片的时候永远是上面的结构，不会导致代码混乱。

* 一定要设置 `canvas` 的 `width` 和 `height` ，因为 `canvas` 里面还是以像素为单位来操作的，与样式里的 `width` 和 `height` 一样数值。否则上传进去的图片不会以原始尺寸显示，不相信可以设置试一下。

* 如果直接使用它的源码貌似是无法进行移动操作的，[官网](http://fabricjs.com/build/)上可以 `Custom Build` ，需要配合 `Event.js` 来使用。

其他的看文档就好，我也只是用了其中的一点点功能而已，还有更多的功能等待你们去发现吧。总的来说这个插件还是强大的。

### [Caman.js](https://github.com/meltingice/CamanJS/)
基于 `canvas` 的处理图片的 `Javascript` 的库，可以直接对 `img` 或者 `canvas` 进行多种滤镜效果处理，无论是图片还是 `canvas`，都会直接转成一个 `canvas` 来进行处理。滤镜的效果可以说还是蛮多的，除了本身就有的十几个效果之外，最关键的是它还可以自定义滤镜效果，完全可以搞出自己想要的效果，当然这里你一定得对艺术有一定的了解。

#### 可以直接对 `img` 或者 `canvas` 进行处理

{% highlight js %}
Caman(n, function () { // n => id of img or canvas, need #
  this.brightness(5).render(function(){
    // callback function code here
    // example
    Caman(n, function() {
      this.newLayer(function(){
        this.overlayImage(mask); // mask => img dom element
      }).render(function(){
        // callback function code here
      });
    });
  });
});
{% endhighlight %}

#### 坑

* 使用这个插件的时候最好本地开个服务器，然后进行测试，不然它会报跨域安全问题的错误，所以它不识别本地 `file:///` 开头的域名地址，然后你就可以使用它的或者自己自定义的滤镜效果了。

* 使用的时候会发现滤镜效果时不断的叠加上去的，貌似不会很智能地判断已经加过滤镜，但是官网上的 `demo` 是可以的，也没去深入研究，所以我的解决方法也是从之前一个项目里面参考来的，就是每第二次开始加滤镜效果的时候，把之前的 `canvas` 重新克隆一个出来（自带的 `DrawImage()` 方法），索性它是不会把滤镜效果给重新绘制的，所以他每次都是给一个新的 `canvas` 添加滤镜，就不会出现叠加的效果了。

* 到这里还没有完，当你发现可以添加滤镜效果的时候，却发现新建的 `canvas` 被添加滤镜效果之后成为一张空白的画布，主要是在 `Mobile` 上出现，`PC` 并不会出现这个问题。找了很久的解决方法，最终在 `StackOverflow` 上面找到了答案，原来是遗漏了官方文档的一段话：

> If a HiDPI display is detected, CamanJS will automatically switch to the HiDPI version if available unless you force disable it with the data-caman-hidpi-disabled attribute. It's important to remember that higher resolution images take longer to render, simply because they have more pixels.

这段话的意思就是在高分辨下的屏幕下， `Caman.js` 会自动使用两倍分辨率的原始图像，如果你不设置的话，它渲染的结果就是找不到图片，不出现效果。所以我们在添加效果或者克隆 `canvas` 之前加上这句：

{% highlight js %}
canvas.setAttribute("data-caman-hidpi-disabled", "true");
{% endhighlight %}

至此，你可以随意添加你喜爱的滤镜效果了，之后可能会做一个基于这个插件的滤镜插件，模仿 `Instagram` 的效果。

### [EXIF.js](https://github.com/exif-js/exif-js/)
用来读取照片中的 `EXIF` 信息。`iPhone` 下竖屏拍照的时候会发生图片上传的时候出现逆时针旋转的现象，所以通过读出图片的旋转属性来进行调整。

具体用法如下：

{% highlight js %}
EXIF.getData(document.getElementById('imgElement'), function(){
  EXIF.getTag(this, 'Orientation');
});
{% endhighlight %}

这样就能读取图片的 `Orientation` 属性，一般可以放在一个变量里面，方便后面的操作。还有很多属性可以去看官方文档，我只是用到其中的一个方法。

### [rem.js](https://github.com/Chen38/rem.js)
我把这个文件上传到了自己的主页上面，感觉有点不要脸的样子，但是自己以后总是会用到的，大家有用没有的，不要抨击极好。

### [WeChat JSSDK](http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html)
整个活动的网站只能在微信端打开，所以比较坑的就是原生文件上传。`Android 4.4.2` 这个中间版本的 `WebView` 控件不支持原生文件上传，导致有些安卓用户不能上传照片，看来真的不能怪我了，重口难调啊。然后因为第三方的介入，需要记录各种数据，包括用户的头像啊昵称啊性别啊什么的，感觉用户信息都没了。然后就是自定义分享了，每个页面都需要分享，首页踏马的还要分两种分享，真的是醉了。

在这里遇到的问题就是请求微信接口配置的时候，链接没有用对编码方式，导致 `URL` 后面的参数被截掉了，然后配置不成功，无法自定义分享，应该用 `encodeURIComponent()` 方法，我的锅，只能说第一次玩微信这个玩意儿，没有经验。自定义分享里的链接和图片必须使用绝对地址，不然不会生效。其他的步骤官方文档里已经写的非常清楚了，大家看看，百度一下，你就知道。反正微信这个东西还是挺坑的，还好腾讯自己开发一个微信网页开发工具，不然真的连调试都不行了。

### 总结

* 到4月8日为止，整个项目应该才算真正地安稳下来，之前因为客户在上线之后还在不断地提修改意见，服务器又不稳定，经常报错，导致我们也是没办法。然后又是因为微信的原因，不能在测试环境中进行调试再上传正式环境，所以每次都在正式环境做修改，有点慌。改到后来已经不是原来的样子了，真的是不好看了。但是客户喜欢就好，我也没办法。

* 从整个文件目录来说，自己规划的还是不够好，下次应该要注意。还有就是 `JS` 写的还是不够完美，虽然代码比较整齐规范，但是在效率上肯定是没有深入优化的，可能因为处女座强迫症的原因，强行不想用 `jQuery` 结果就是所有简单的效果都自己写了一遍，而且最后还是引用了 `jQuery`，是不是傻。但是我觉得之后可以用 `zepto.js`，是一个类似的，还比较轻量级。

* 然后在 `CSS` 上面忘记重写一些样式了，导致后面的时候出现样式上咋回事啊这是，自己都蒙逼了，所以在开始写之前，还是都把基础的结构以及药准备的文件都放好，等项目开始的时候就可以直接上手，节省大部分时间。

* 可能自己在整个项目中的确实有一点提升，也有辛苦在其中，只是想说自己还需要努力，毕竟还是一只菜鸟，还要学习的东西很多，不要老是一根筋，要学会多变，多向 `Niki` 学习，碰到这么好的一个前端leader不容易，大爱！

* 还有就是自己在开始项目的时候，过于一根筋，应该分析一下自己的项目中引用到的插件或是文件分类，原本有一些资源是可以重复利用的，我反而复杂化了，增加了代码量不说，而且自己写的代码不一定高效，反而会在一定程度上影响页面的优化，所以这点以后一定要注意一下。还有就是开始码代码之前应该看下页面的设计稿，大致分析一下页面结构，对整体的 `DOM` 结构也是有帮助的，应该说可以有一大部分的优化吧。

* 第一次做项目总结，也可能还是会遗漏一些东西，写的可能也不是太清楚明白，来看的就将就一下，多看看官方文档，多 `Google`，多 `StackOverflow`，大神还是会存在拯救你的。

{% highlight js %}
console.info('I am Adobe.');
{% endhighlight %}
