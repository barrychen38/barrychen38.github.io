---
layout: post
title:  "用于取参数的正则匹配函数"
date:   2016-09-21 10:48:37 +0800
categories: Record Study
---

主要整理了一些用于取出参数的正则匹配函数，希望对大家有用。

### 域名地址后的 *search* 参数

{% highlight js %}
function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"),
    r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURIComponent(r[2]);
  return null;
}
{% endhighlight %}

### cookie 中的参数

{% highlight js %}
function getCookie(name) {
  var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"),
    r = document.cookie.match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
{% endhighlight %}

暂时就是这两个，以后有发现会更新。