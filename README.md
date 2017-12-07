# my-f2

[![](https://img.shields.io/travis/antvis/my-f2.svg)](https://travis-ci.org/antvis/my-f2)
![](https://img.shields.io/badge/language-javascript-red.svg)
![](https://img.shields.io/badge/license-MIT-000000.svg)

[![npm package](https://img.shields.io/npm/v/@antv/my-f2.svg)](https://www.npmjs.com/package/@antv/my-f2)
[![NPM downloads](http://img.shields.io/npm/dm/@antv/my-f2.svg)](https://npmjs.org/package/@antv/my-f2)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/antvis/my-f2.svg)](http://isitmaintained.com/project/antvis/my-f2 "Percentage of issues still open")

F2 for mini-program.

## Install

`npm install @antv/my-f2`

## Usage

```html
<!-- page.axml, pixeRatio = 2 -->
<view class="container">
  <canvas
    id="canvas"
    class="canvas"
    width=600
    height=600
    style="width: 300px; height: 300px;"
  />
</view>
```

```js
// page.js
import MyF2 from '@antv/my-f2';

const data = [
  { tem: 10, city: 'tokyo' },
  { tem: 4, city: 'newYork' },
  { tem: 3, city: 'berlin' }
];
const chart = new MyF2.Chart({
  el: my.createCanvasContext('canvas'),
  width: 600,
  height: 600,
  padding: [ 40, 40, 40, 80 ]
});
chart.source(data);
chart.coord({
  transposed: true
});
// 配置刻度文字大小，供PC端显示用(移动端可以使用默认值20px)
chart.axis('city', {
  label: {
    fontSize: 14
  },
  grid: null
});
chart.axis('tem', {
  label: {
    fontSize: 14
  }
});
chart.interval().position('city*tem').color('city');
chart.render();
```

## API

See details at https://antv.alipay.com

