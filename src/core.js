const Renderer = require('./renderer');
const Core = require('@antv/f2/lib/core'); // 引入 F2 的核心包

const EVENTS_MAP = {
  touchstart: 'touchStart',
  touchmove: 'touchMove',
  touchend: 'touchEnd',
  touchcancel: 'touchCancel'
};

// 为小程序封装事件机制
Core.Util.addEventListener = function(source, type, listener) {
  const context = source.getContext('2d');
  type = EVENTS_MAP[type]; // 支付宝小程序事件名为驼峰结构
  context.emitter.addListener(type, listener);
};

Core.Util.removeEventListener = function(source, type, listener) {
  const context = source.getContext('2d');
  type = EVENTS_MAP[type]; // 支付宝小程序事件名为驼峰结构
  context.emitter.removeListener(type, listener);
};

Core.Util.createEvent = function(event, chart) {
  if(event[0]){
    event = event[0]
  }  
  const type = event.type;
  let x = 0;
  let y = 0;
  const touches = event.touches;
  if (touches && touches.length > 0) {
    x = touches[0].x;
    y = touches[0].y;
  }

  return {
    type,
    chart,
    x,
    y
  };
};

Core.Renderer = Renderer;

module.exports = Core;
