const Renderer = require('./renderer');
const Core = require('@antv/f2/lib/core'); // 引入 F2 的核心包
// 为小程序封装事件机制
Core.Util.addEventListener = function(source, type, listener) {
  source.addListener(type, listener);
};

Core.Util.removeEventListener = function(source, type, listener) {
  source.removeListener(type, listener);
};

Core.Util.createEvent = function(event, chart) {
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
