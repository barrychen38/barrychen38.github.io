---
layout: post
title:  "MacBookPro HiDPi Setup"
date:   2017-04-04 21:40:03 +0800
categories: Record Setup
---

自从入手了*MacBookPro*之后，显示效果确实不错，但是介于屏幕实在是太小了，所以入手了两个显示器，在连接的时候发现字体比较虚，有点辣眼睛，所以在网上找到了对应的方法，顺便记录下，以后也能用下。

> Mac 外接显示器的时候默认为 TV 输出模式，所以效果不好，所以我们需要强制修改输出模式。

### 针对最大分辨率为 `1920x1080` 的显示器
 
因为分辨率的原因，其实现实效果只能那样了，近距离看是就是一堆像素点，但是看视频图片啥的还是很细腻的，所以我们需要把输出模式改成 `RGB` 模式，但是我觉得还是没啥感觉，可能是 *Retina* 屏幕看久了，接下来说下方法。

首先是下载一个[Ruby](https://gist.github.com/BugRoger/5520488)文件，放在你合适的位置，然后进入该目录，执行：

```
ruby patch-edid.rb
```

之后就会生成一个 `DisplayVendorID-xxxx` 的文件夹，`xxx` 因每个人的显示器设备不同，之后将其放入该目录下：

```
/System/Library/Displays/Contents/Resources/Overrides
```

可能需要权限操作。

之后重新连接显示器就可以看到效果了。

### 针对最大分辨率为 `2K` 的显示器

这类显示器的显示效果就相当细腻了，所以一般来说来显示 `1920x1080` 的效果会相当好，媲美原生，所以在这里需要借助一个工具：`SwitchResX`。这个工具可以看到设备更多的显示分辨率，而且还可以自定义想要的分辨率，其实操作和上面的差不多，只不过需要编辑生成文件夹里的文件内容，大家用 `TextEdit` 编辑就行了，需要添加的有两个东西，一个是想显示的分辨率，还有一个是两倍的显示分辨率。添加方法如下：

这是生成的文件：

```XML
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>DisplayProductName</key>
  <string>DELL U2414H - forced RGB mode (EDID override)</string>
  <key>IODisplayEDID</key>
  <data>AP///////wAQrKKgTFlOMwobAQSlNR54Jn51p1VSnCcPUFSlSwBxT4GAqcCp
QNHAAQEBAQEBAjqAGHE4LUBYLEUADyghAAAeAAAA/wBHTjY0VjczNzNOWUwK
AAAA/ABERUxMIFUyNDE0SAogAAAA/QA4TB5TEQAKICAgICAgAOc=</data>
  <key>DisplayVendorID</key>
  <integer>4268</integer>
  <key>DisplayProductID</key>
  <integer>41122</integer>
</dict>
</plist>
```

我们需要改的地方就是在 *12* 行后面添加多一个标签：

```XML
<key>scale-resolutions</key>
  <array>
    <data>
      AAAHgAAABDgAAAABACAAAA==
    </data>
    <data>
      AAAPAAAACHAAAAABACAAAA==
    </data>
  </array>
```

`<data/>` 标签里的内容是这样的，首先得到分辨率的*16进制*，然后在后面加上这串：`00000001 00200000`

以 `1920x1080` 为例：

原始分辨率转换后：`00000780 00000438 00000001 00200000`

两倍分辨率转换后：`00000F00 00000870 00000001 00200000`

这里需要另一个工具就是 `PlistEdit Pro`，编辑起来很简单，把转换后的输入后就会得到上面的英文字母那样的，之后还是把整个文件夹拖入 `/System/Library/Displays/Contents/Resources/Overrides` 中，注意权限问题，然后重启一下电脑，打开 `SwitchResX` 就可以看见 `HiDPi` 模式的 `1920x1080` 显示分辨率了。