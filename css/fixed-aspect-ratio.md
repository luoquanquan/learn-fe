# 实现元素固定宽高比

## 利用固定比例图片撑开

> 众所周知，如果只给 img 元素设置 width or height 中的一个属性，剩下的尺寸属性默认会根据图片的尺寸进行等比缩放。然后利用图片的尺寸再撑起容器。获得的容器大小应该就是和图片的宽高比一致的啦 ~

代码实现如下：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        /* 设置 font-size: 0; 的主要原因是: img 标签两侧的空白字符也可能会占据高度 */
        .box { width: 100%; font-size: 0; }
        .box img { width: 100%; }
    </style>
</head>
<body>
    <div class="box">
        <img src="./4-3.png" alt="" />
    </div>
</body>
</html>
```

## 利用垂直方向 padding

> 垂直方向上的内外边距使用百分比做单位时，是基于包含块的宽度来计算的。

也就是说，当元素的 padding-top or padding-bottom 使用了百分比的值的时候，其依据的值为元素的宽度。那么我们可以直接通过设置纵向的内边距实现等比的效果

实现代码如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .box {
            width: 100%;
            padding-top: 20%;
            background-color: aqua;
        }
    </style>
</head>
<body>
    <div class="box"></div>
</body>
</html>
```

## aspect-ratio 属性指定元素宽高比

> The aspect-ratio  CSS property sets a preferred aspect ratio for the box, which will be used in the calculation of auto sizes and some other layout functions.

aspect-ratio 应该算是 css 4 的新特性吧，可以指定元素的宽高比。实现此类需求更加的方便

具体的设置代码如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .box {
            width: 100%;
            aspect-ratio: 3 / 1;
            background-color: aqua;
        }
    </style>
</head>
<body>
    <div class="box"></div>
</body>
</html>
```
