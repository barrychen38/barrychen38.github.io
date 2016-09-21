---
layout: post
title:  "The this problem in Javascript"
date:   2016-04-15 15:42:17 +0800
categories: jekyll update
---

When it comes to `this`, you have to mention `function`. Due to the different call `function` objects, leading to the different points of `this`. `function` is also an object that needs to be performed in a particular environment. Figure out the two most common methods of `function` you can basically understand the use of `this`.

#### The two methods of `function`: `call` and `apply`

* ##### `apply` method: Can hijack another object method, inherited property of another object

	`Function.apply(obj,args)`
    
	`obj`: this object will replace the `this` object in the `Function` class
    
	`args`: this is an Array, it will be passed as a parameter `Function(args-->arguments)`
	
{% highlight js %}
function Person(name,age) {
  this.name = name;
  this.age = age;
}
function Student(name,age,sex) {
  Person.apply(this,arguments);
  this.sex = sex;
}
var student = new Student("chen38",22,"man");
console.log("name:" + student.name + " age:" + student.age + " sex:" + student.sex);
//==> name:chen38 age:22 sex:man
{% endhighlight %}
	
* ##### `call` method: have the same meaning with `apply`, but it is not the same parameter list
	
	`Function.call(obj,[param1[,param2[,…[,paramN]]]])`
        
    `obj`: this object will replace the `this` object in the `Function` class
    
    `params`: this is a parameter list
    
{% highlight js %}
function print(word) {
  console.log(this + word);
}
print.call("Hello ", "World!"); //==> Hello World!
{% endhighlight %}
    
Generally speaking, `functionName(arg)` can be directly replaced by `functionName.call(window, arg)`, this makes it clear where the various parameters are pointing
    
Anonymous function is the same as the substitution method:
    
{% highlight js %}
(function(name){
  console.log(name);
})("Hello");
// equivalent to
(function(name){
  console.log(name);
}).call(window, "Hello");
{% endhighlight %}
    
The function is called as the object's property is different:
   
{% highlight js %}
var person = {
  name: "chen38",
  sex: function(sex) {
    console.log(this.name + " is " + sex);
  }
};
person.sex("man"); //==> chen38 is man
// equivalent to
person.sex.call(person, "man"); //==> chen38 is man
{% endhighlight %}

When using the `call` method here, `this` points to the object itself.
    
`call` method can also be used for constructors:
   
{% highlight js %}
function Person(name) {  
  this.name = name;  
}
var obj = new Person("chen38");
console.log(obj.name); //==> chen38
{% endhighlight %}

The key is to understand the `new` operator (not explained in detail):
    
{% highlight js %}
var obj = {};
obj.__proto__ = Person.prototype;
Person.call(obj);
{% endhighlight %}
    
From above we can figure out `this` method:
   
{% highlight js %}
functionName(arg) ==> functionName.call(window, arg)
{% endhighlight %}
{% highlight js %}
obj.functionName(arg) ==> obj.functionName.call(obj, arg)
{% endhighlight %}
