---
layout: post
title:  "Backbone 学习记录"
date:   2017-01-09 16:42:05 +0800
categories: record study
---

近段时间接手了公司的一个小 `Campaign`，设计比较像单页应用的样子，所以打算用一个 `MV*` 的框架来写。开始的时候后有考虑到 `Vue`，但是页面中需要双向绑定的数据并不是特别多，所以不打算浪费 `Vue` 的潜能。再说了官方推荐最好使用组件的方式来写，用 `webpack` 来打包，然而我都不会，而且只学了一半。最后还是挑了今天的主角 `Backbone`，写法上并没有很简单，配置一大堆，而且重度依赖于 `Underscore`，依赖于 `jQuery`，当然也可以骗过它，使用 `Zepto`，后面会讲到。接下来就正式开始记录我用到和学到的东西，不会讲的很全，但是也够用。

### 官方信息

文档还是要多看，`GitHub` 用来看下这个项目的火热度，星星还是蛮多的。

* 官方文档：[http://backbonejs.org/](http://backbonejs.org/)

* 中文文档：[http://www.css88.com/doc/backbone/](http://www.css88.com/doc/backbone/)

* GitHub地址: [jashkenas/backbone](https://github.com/jashkenas/backbone)

### 四大部分

`Backbone` 主要由下面四个部分组成，相互配合利用，所有的方法都是*扩展再实例化*，全局暴露对象 `Backbone` 上也有相应的方法。

#### 模型 (Model)

通俗来讲就是个对象集合，可以看成数据库里的一条数据。这些数据可以通过视图展示在页面上。调用形式：

{% highlight js %}
var NewModel = Backbone.Model.extend({
  defaults: {
    name: 'Barry',
    age: 18
  }
});
var newModel = new NewModel({
  name: 'Chen',
  age: 25
});
{% endhighlight %}

参数 `defaults` 里面就是一条默认数据，当从服务器拉取的数据*解析不正确*或者*缺少对应属性*的时候，就会使用默认数据替代，一般需要设置，因为如果自己忘记写了某个需要显示在视图里的属性会用默认的替代而不会报错。

实例化的时候可以直接写入数据，后续可以通过 `set` 和 `get` 方法来设置和得到对应数据。当 `set` 的时候就会触发 `change` 事件，从而执行相应的操作，一般是更新视图。也可以通过 `toJSON()` 方法直接得到 `JSON字符串` 格式的数据。

从服务器端拉取数据用到的是 `fetch` 方法，但是之前说过模型只是一条数据，当有多条数据的时候模型是不实际的，所以要讲下面的部分。

#### 集合 (Collection)

如果模型是数据库里的一条数据，那么集合可以看成数据库的表，是众多模型的集合。所以集合会有模型的方法，也会有模型没有的方法。调用形式：

{% highlight js %}
var NewCollection = Backbone.Collection.extend({
  model: NewModel,
  url: 'api/index.php',
  parse: function(res) {
    // get what you want in response
  }
});
var newCollection = new NewCollection([
  {name: 'Barry', age: 18},
  {name: 'Chen', age: 25}
]);
{% endhighlight %}

需要指定模型，让集合知道数据的类型。

`url` 就是更新数据的接口。

`parse` 函数用来处理接受到的数据，`res` 是原生的服务端返回的数据，所以在这边可以返回我们想要的东西。

实例化的时候直接可以加入多条数据，是一个数组对象。此时会触发 `add` 和 `remove` 时事件，用的多的还是 `add` 事件。所以当有新的数据更新的时候，有几条数据机会出发几次 `add` 事件，在视图上更新列表时很有用。其实这边在 `Backbone` 的源码里处理的很智能没，每次添加数据的时候会先在已有的数据里去找有没有重复的数据，如果有就更新，没有就添加，当时因为不知道这个，更新列表的时候明明有请求了，但就是不更新。

由于集合实际上是一个模型的数组集合，因此也代理了 `Underscore` 上的多数的数组方法，因此循环的时候每一个 `item` 就是一个模型了，对于数据的处理也很有帮助，有点像从 `MySQL` 里取数据的感觉。数据存储方面讲完了，接下来就是要显示出来了。

#### 视图 (View)

说简单点就是 `HTML` 的渲染和元素事件的绑定，写在那个视图里瞬间清爽了许多。调用形式：

{% highlight js %}
var NewView = Backbone.View.extend({
  id: 'app',
  className: 'page',
  tagName: 'ul',
  initialize: function() {
    this.ListenTo(Backbone, 'toggle', this.toggle);
  },
  render: function(data) {
    var template = _.tempalte($('#temp').html());
    this.$el.html(template(data));
    return this;
  },
  events: {
    'click .btn': 'show'
  },
  show: function() {
    this.$el.find('.float').show();
  },
  toggle: function() {
    this.$el.toggleClass('slide');
  }
});
var newView = new NewView;
newView.render({name: 'Barry Chen'});
$(document.body).html(newView.el);
Backbone.trigger('toggle');
{% endhighlight %}

写了很多，感觉都还蛮经常用到的，接下来一一解释下。

创建视图的时候会默认在模板文件的最外面包裹一层，默认是 `div`，所以我们可以指定他的 `id` 和 `className` 以及 `tagName`，方便我们放样式。也有一个 `initialize` 的函数，用来监听些事件啥的，看自己需要，这边只是一个例子。`render` 函数是必须的，也就是编译模板文件。可以默认使用 `Underscore` 的模板语法，也可以使用其他的，最后输出能识别的 `HTML` 就行了。我就直接使用默认语法了，和 `ejs` 一样。给个示例：

{% highlight ejs %}
<span><%= name %></span>
{% endhighlight %}

`<% %>` 把它看成 `\{\{\ \}\}` 就好了，一样的。中间有个 `=` 表示这是个变量，没有的就是 `js` 执行语句了，还有个 `-` 的表示里面以 `HTML` 的形式输出，比较少用，你懂的。其中的 `name` 其实就是我们实例化渲染的时候带入的数据，最后的输出结果应该知道，更多的语法看[这里](http://underscorejs.org/#template)吧。

`events` 里就是对模板元素的事件绑定，函数里写啥应该都会，但是注意 `this` 指向的是定义的 `NewView`，所以不要使用 `$(this)`，会报错。

其他的就是一些定义的事件，包括监听和触发。

#### 路由 (Router)

通过监听域名地址的 `hash` 值的变化来跳转试图，可以保留当前视图的状态，有点神奇。调用形式：

{% highlight js %}
var NewRouter = Backbone.Router.extend({
  routes: {
    '':         'index',
    'search':   'search'
  },
  initialize: function() {
    this.$body = $(document.body);
  },
  index: function() {
    if (!indexView) {
      indexView  = new IndexView;
      indexView.render();
    }
    // change title show
    this.$body.html(indexView.el);
  },
  search: function() {
    if (!searchView) {
      searchView  = new SearchView;
      searchView.render();
    }
    // change title show
    this.$body.html(searchView.el);
  }
});
var newRouter = new NewRouter;
Backbone.history.start();
newRouter.navigate('search', {
  trigger: true,
  // repalce: true
});
{% endhighlight %}

首先指定路由，我这边给出的例子很简单，就是 `hash` 值为空的时候，执行 `index` 函数，`search` 值的时候执行 `search` 函数。对应的函数中的其实只是改变 `body` 元素中的内容，所以我们需要配置的就这么多。四个部分有序的组合起来就可以变成一个比较看的过去的 `SPA` 了。

#### 其他

项目中用了 `requirejs` 来模块化 `js` 文件，`backbone` 的源码中有些 `AMD` 模式的支持，但是默认是依赖于 `jQuery` 的，我取出来了可以看下：

{% highlight js %}
if (typeof define === 'function' && define.amd) {
  define(['underscore', 'jquery', 'exports'], function(_, $, exports) {
    // Export global even in AMD case in case this script is loaded with
    // others that may still expect a global Backbone.
    root.Backbone = factory(root, exports, _, $);
  });
}
{% endhighlight %}

作者写了这个库的依赖，然后把全局的 `Backbone` 对象暴露出去，以至于加载之前会先加载 `underscore` 和 `jquery`，所以我们耍赖把 `Zepto` 的别名设置为 `jquery`，如下：

{% highlight js %}
require.config({
  baseUrls: './',
  paths: {
    'jquery': 'vendor/js/zepto'
  }
});
{% endhighlight %}

这样就可以大大减小压缩的代码了。

### 总结

其实我开始写之前对于这个库并不是特别熟，看了很多的例子和教学视频才开始上手写，写的过程中也是边看文档编写。到现在写下来之后，发现自己终于有点理解了，虽然配置起来很烦，需要写很多东西，但框架本身的思想值得我们学习，写到后来你会发现其实很有意思，绕来绕去终于出现了自己想要的结果，运行成功的一刹那真是开心极了。整篇文章写的不是特别详细，但是基本用法都有了，用到的也就这么多，更多的还是需要自己看文档学习。现在写这篇文章可能证明了我真的在前端技术这块落后很多了，别人用 `Vue`，我用 `Backbone`，别人用 `Webpack`，我用 `Gulp`，能提高效率就好，能自动化就好，能实现效果就好，客户才不管你代码写怎么样～