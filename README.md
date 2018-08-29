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

## 示例

Demos: https://github.com/antvis/mini-program-f2-demos/tree/master/ ，可以使用支付宝开发工具直接打开体验。

## 使用

```css
<!-- page.acss -->
canvas {
  width: 100%;
  height: 100%;
}
```

```html
<view class="container">
  <canvas
    id="area"
    onTouchStart="touchStart"
    onTouchMove="touchMove"
    onTouchEnd="touchEnd"
    width="{{width}}" height="{{height}}"
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
    // ...
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
        // 获取分辨率
        const pixelRatio = my.getSystemInfoSync().pixelRatio;
        // 获取画布实际宽高
        const canvasWidth = res[0].width;
        const canvasHeight = res[0].height;
        // 高清解决方案
        this.setData({
          width: canvasWidth * pixelRatio,
          height: canvasHeight * pixelRatio
        });
        const myCtx = my.createCanvasContext('area');
        myCtx.scale(pixelRatio, pixelRatio); // 必要！按照设置的分辨率进行放大
        const canvas = new F2.Renderer(myCtx);
        this.canvas = canvas;
        //console.log(res[0].width, res[0].height);
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


## 说明
如果项目对代码大小有要求，可以使用按需加载模块，只引入需要的模块，参加折线图 demo: `https://github.com/antvis/mini-program-f2-demos/blob/master/pages/charts/line/index.js`。

如何进行按需加载，请参见：https://antv.alipay.com/zh-cn/f2/3.x/tutorial/require-on-demand.html

```js
import F2 from '@antv/my-f2/lib/core'; // 必须引入
require('@antv/f2/lib/geom/line'); // 只引入折线图
require('@antv/f2/lib/scale/time-cat'); // 时间类型的度量
const Tooltip = require('@antv/f2/lib/plugin/tooltip'); // 引入 tooltip 插件
```



## 如何贡献

如果您在使用的过程中碰到问题，可以先通过 [issues](https://github.com/antvis/wx-f2/issues) 看看有没有类似的 bug 或者建议。

## License

[MIT license](https://github.com/antvis/wx-f2/blob/master/LICENSE)
