# my-f2

[![](https://img.shields.io/travis/antvis/my-f2.svg)](https://travis-ci.org/antvis/my-f2)
![](https://img.shields.io/badge/language-javascript-red.svg)
![](https://img.shields.io/badge/license-MIT-000000.svg)

[![npm package](https://img.shields.io/npm/v/@antv/my-f2.svg)](https://www.npmjs.com/package/@antv/my-f2)
[![NPM downloads](http://img.shields.io/npm/dm/@antv/my-f2.svg)](https://npmjs.org/package/@antv/my-f2)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/antvis/my-f2.svg)](http://isitmaintained.com/project/antvis/my-f2 "Percentage of issues still open")

F2 for alipay mini-program.

说明：目前由于小程序不支持 document，所以 Guide.Html 辅助元素组件目前仍无法使用，其他 F2 的功能全部支持。

## 下载

`npm install @antv/my-f2`

## 使用

```css
<!-- page.acss -->
canvas {
  width: 100%;
  height: 100%;
}
```

```html
<!-- page.axml, pixeRatio = 2 -->
<view class="container">
  <canvas
    id="area"
    onTouchStart="touchStart"
    onTouchMove="touchMove"
    onTouchEnd="touchEnd"
  />
</view>
```

```js
import F2 from '@antv/my-f2';
const app = getApp();

let chart = null;

function drawChart(canvas, width, height) {
  const data = [
    { value: 63.4, city: 'New York', date: '2011-10-01' },
    { value: 62.7, city: 'Alaska', date: '2011-10-01' },
    { value: 72.2, city: 'Austin', date: '2011-10-01' },
    { value: 58, city: 'New York', date: '2011-10-02' },
    { value: 59.9, city: 'Alaska', date: '2011-10-02' },
    { value: 67.7, city: 'Austin', date: '2011-10-02' },
    { value: 53.3, city: 'New York', date: '2011-10-03' },
    { value: 59.1, city: 'Alaska', date: '2011-10-03' },
    { value: 69.4, city: 'Austin', date: '2011-10-03' },
    { value: 55.7, city: 'New York', date: '2011-10-04' },
    { value: 58.8, city: 'Alaska', date: '2011-10-04' },
    { value: 68, city: 'Austin', date: '2011-10-04' },
    { value: 64.2, city: 'New York', date: '2011-10-05' },
    { value: 58.7, city: 'Alaska', date: '2011-10-05' },
    { value: 72.4, city: 'Austin', date: '2011-10-05' },
    { value: 58.8, city: 'New York', date: '2011-10-06' },
    { value: 57, city: 'Alaska', date: '2011-10-06' },
    { value: 77, city: 'Austin', date: '2011-10-06' },
    { value: 57.9, city: 'New York', date: '2011-10-07' },
    { value: 56.7, city: 'Alaska', date: '2011-10-07' },
    { value: 82.3, city: 'Austin', date: '2011-10-07' },
    { value: 61.8, city: 'New York', date: '2011-10-08' },
    { value: 56.8, city: 'Alaska', date: '2011-10-08' },
    { value: 78.9, city: 'Austin', date: '2011-10-08' },
    { value: 69.3, city: 'New York', date: '2011-10-09' },
    { value: 56.7, city: 'Alaska', date: '2011-10-09' },
    { value: 68.8, city: 'Austin', date: '2011-10-09' },
    { value: 71.2, city: 'New York', date: '2011-10-10' },
    { value: 60.1, city: 'Alaska', date: '2011-10-10' },
    { value: 68.7, city: 'Austin', date: '2011-10-10' },
    { value: 68.7, city: 'New York', date: '2011-10-11' },
    { value: 61.1, city: 'Alaska', date: '2011-10-11' },
    { value: 70.3, city: 'Austin', date: '2011-10-11' },
    { value: 61.8, city: 'New York', date: '2011-10-12' },
    { value: 61.5, city: 'Alaska', date: '2011-10-12' },
    { value: 75.3, city: 'Austin', date: '2011-10-12' },
    { value: 63, city: 'New York', date: '2011-10-13' },
    { value: 64.3, city: 'Alaska', date: '2011-10-13' },
    { value: 76.6, city: 'Austin', date: '2011-10-13' },
    { value: 66.9, city: 'New York', date: '2011-10-14' },
    { value: 67.1, city: 'Alaska', date: '2011-10-14' },
    { value: 66.6, city: 'Austin', date: '2011-10-14' },
    { value: 61.7, city: 'New York', date: '2011-10-15' },
    { value: 64.6, city: 'Alaska', date: '2011-10-15' },
    { value: 68, city: 'Austin', date: '2011-10-15' },
    { value: 61.8, city: 'New York', date: '2011-10-16' },
    { value: 61.6, city: 'Alaska', date: '2011-10-16' },
    { value: 70.6, city: 'Austin', date: '2011-10-16' },
    { value: 62.8, city: 'New York', date: '2011-10-17' },
    { value: 61.1, city: 'Alaska', date: '2011-10-17' },
    { value: 71.1, city: 'Austin', date: '2011-10-17' },
    { value: 60.8, city: 'New York', date: '2011-10-18' },
    { value: 59.2, city: 'Alaska', date: '2011-10-18' },
    { value: 70, city: 'Austin', date: '2011-10-18' },
    { value: 62.1, city: 'New York', date: '2011-10-19' },
    { value: 58.9, city: 'Alaska', date: '2011-10-19' },
    { value: 61.6, city: 'Austin', date: '2011-10-19' },
    { value: 65.1, city: 'New York', date: '2011-10-20' },
    { value: 57.2, city: 'Alaska', date: '2011-10-20' },
    { value: 57.4, city: 'Austin', date: '2011-10-20' },
    { value: 55.6, city: 'New York', date: '2011-10-21' },
    { value: 56.4, city: 'Alaska', date: '2011-10-21' },
    { value: 64.3, city: 'Austin', date: '2011-10-21' },
    { value: 54.4, city: 'New York', date: '2011-10-22' },
    { value: 60.7, city: 'Alaska', date: '2011-10-22' },
    { value: 72.4, city: 'Austin', date: '2011-10-22' },
    { value: 54.4, city: 'New York', date: '2011-10-23' },
    { value: 65.1, city: 'Alaska', date: '2011-10-23' },
    { value: 72.4, city: 'Austin', date: '2011-10-23' },
    { value: 54.8, city: 'New York', date: '2011-10-24' },
    { value: 60.9, city: 'Alaska', date: '2011-10-24' },
    { value: 72.5, city: 'Austin', date: '2011-10-24' },
    { value: 57.9, city: 'New York', date: '2011-10-25' },
    { value: 56.1, city: 'Alaska', date: '2011-10-25' },
    { value: 72.7, city: 'Austin', date: '2011-10-25' },
    { value: 54.6, city: 'New York', date: '2011-10-26' },
    { value: 54.6, city: 'Alaska', date: '2011-10-26' },
    { value: 73.4, city: 'Austin', date: '2011-10-26' },
    { value: 54.4, city: 'New York', date: '2011-10-27' },
    { value: 56.1, city: 'Alaska', date: '2011-10-27' },
    { value: 70.7, city: 'Austin', date: '2011-10-27' },
    { value: 42.5, city: 'New York', date: '2011-10-28' },
    { value: 58.1, city: 'Alaska', date: '2011-10-28' },
    { value: 56.8, city: 'Austin', date: '2011-10-28' },
    { value: 40.9, city: 'New York', date: '2011-10-29' },
    { value: 57.5, city: 'Alaska', date: '2011-10-29' },
    { value: 51, city: 'Austin', date: '2011-10-29' },
    { value: 38.6, city: 'New York', date: '2011-10-30' },
    { value: 57.7, city: 'Alaska', date: '2011-10-30' },
    { value: 54.9, city: 'Austin', date: '2011-10-30' },
    { value: 44.2, city: 'New York', date: '2011-10-31' },
    { value: 55.1, city: 'Alaska', date: '2011-10-31' },
    { value: 58.8, city: 'Austin', date: '2011-10-31' },
    { value: 49.6, city: 'New York', date: '2011-11-01' },
    { value: 57.9, city: 'Alaska', date: '2011-11-01' },
    { value: 62.6, city: 'Austin', date: '2011-11-01' },
    { value: 47.2, city: 'New York', date: '2011-11-02' },
    { value: 64.6, city: 'Alaska', date: '2011-11-02' },
    { value: 71, city: 'Austin', date: '2011-11-02' }
  ];
  chart = new F2.Chart({
    el: canvas,
    width,
    height
  });

  chart.source(data, {
    date: {
      range: [ 0, 1 ],
      type: 'timeCat',
      mask: 'MM-DD'
    },
    value: {
      max: 300,
      tickCount: 4
    }
  });
  chart.tooltip({
    showCrosshairs: true,
    custom: true, // 自定义 tooltip 内容框
    onChange(obj) {
      const legend = chart.get('legendController').legends.top[0];
      const tooltipItems = obj.items;
      const legendItems = legend.items;
      const map = {};
      legendItems.map(item => {
        map[item.name] = Object.assign({}, item);
      });
      tooltipItems.map(item => {
        const { name, value } = item;
        if (map[name]) {
          map[name].value = value;
        }
      });
      legend.setItems(Object.values(map));
    },
    onHide() {
      const legend = chart.get('legendController').legends.top[0];
      legend.setItems(chart.getLegendItems().country);
    }
  });
  chart.axis('date', {
    label(text, index, total) {
      const textCfg = {};
      if (index === 0) {
        textCfg.textAlign = 'left';
      }
      if (index === total - 1) {
        textCfg.textAlign = 'right';
      }
      return textCfg;
    }
  });
  chart.area().position('date*value').color('city').adjust('stack');
  chart.line().position('date*value').color('city').adjust('stack');
  chart.render();
  return chart;
} 

Page({
  data: {},
  onReady() {
    my.createSelectorQuery()
      .select('#area')
      .boundingClientRect()
      .exec((res) => {
        const myCtx = my.createCanvasContext('area');
        const canvas = new F2.Renderer(myCtx);
        this.canvas = canvas;
        drawChart(canvas, res[0].width, res[0].height);
      });
  },
  touchStart(e) {
    if (this.canvas) {
      this.canvas.emitEvent('touchstart', [e]);
    }
  },
  touchMove(e) {
    if (this.canvas) {
      this.canvas.emitEvent('touchmove', [e]);
    }
  },
  touchEnd(e) {
    if (this.canvas) {
      this.canvas.emitEvent('touchend', [e]);
    }
  }
});
```


## API

由于 f2-canvas 组件主要是对小程序的画布上下文和 html5 canvas 的上下文进行了适配以支持 F2 在小程序端的渲染，所以 **F2 能绘制什么图表，小程序端就能绘制什么图表**，使用时也只需按照 F2 的语法来写即可。

具体 F2 的 api 参考：https://antv.alipay.com/zh-cn/f2/3.x/api/index.html

## FAQ

### 画布分辨率问题

如果需要在高 dpr 下取得更细腻的显示，需要先将 canvas 用属性设置放大，用样式缩写，例如

```html
<!-- getSystemInfoSync().pixelRatio === 2 -->
<canvas width="200" height="200" style="width:100px;height:100px;"/>
```

同时需要在创建 Chart 的时候将以上设置的像素比传入：

```js
chart = new F2.Chart({
  el: canvas,
  width,
  height,
  pixelRatio: 2
});
```

### 是否可以封装成小程序组件

支付宝小程序支持自定义组件之后支持。

## 如何贡献

如果您在使用的过程中碰到问题，可以先通过 [issues](https://github.com/antvis/wx-f2/issues) 看看有没有类似的 bug 或者建议。

## License

[MIT license](https://github.com/antvis/wx-f2/blob/master/LICENSE)
