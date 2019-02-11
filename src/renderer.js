/**
 * f2 专为适配微信小程序绘图上下文 context 而封装的伪 Canvas
 * @authors (sima.zhang1990@gmail.com)
 * @version 1.0.0
 */

const EventEmitter = require('wolfy87-eventemitter');
const CAPITALIZED_ATTRS_MAP = {
  fillStyle: 'FillStyle',
  fontSize: 'FontSize',
  globalAlpha: 'GlobalAlpha',
  opacity: 'GlobalAlpha',
  lineCap: 'LineCap',
  lineJoin: 'LineJoin',
  lineWidth: 'LineWidth',
  miterLimit: 'MiterLimit',
  strokeStyle: 'StrokeStyle',
  textAlign: 'TextAlign',
  textBaseline: 'TextBaseline',
  shadow: 'Shadow'
};

class Renderer extends EventEmitter {
  constructor(myCtx) {
    super();
    const self = this;
    self.ctx = myCtx;
    self.style = {}; // just mock
    self._initContext(myCtx);
  }

  getContext(type) {
    if (type === '2d') {
      return this.ctx;
    }
  }

  _initContext(myCtx) {
    Object.keys(CAPITALIZED_ATTRS_MAP).map(key => {
      Object.defineProperty(myCtx, key, {
        set(value) {
          // myCtx.setShadow(shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor)
          if (key === 'shadow' && myCtx.setShadow && Array.isArray(value)) {
            myCtx.setShadow(value[0], value[1], value[2], value[3]);
          } else {
            const name = 'set' + CAPITALIZED_ATTRS_MAP[key];
            myCtx[name](value);
          }
        }
      });
      return key;
    });
  }
}

module.exports = Renderer;
