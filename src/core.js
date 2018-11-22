const Renderer = require('./renderer');
const Core = require('@antv/f2/lib/core'); // 引入 F2 的核心包

function strLen(str) {
  let len = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128) {
      len++;
    } else {
      len += 2;
    }
  }

  return len;
}

// override some methods
// 由于目前钉钉小程序框架善不支持 measureText 方法，故用此方法 mock
Core.Util.measureText = function(text, font, ctx) {
  if (!ctx || !ctx.measureText) {
    let fontSize = 12;
    if (font) {
      fontSize = parseInt(font.split(' ')[3], 10);
    }
    fontSize /= 2;
    return {
      width: strLen(text) * fontSize
    };
  }

  ctx.font = font || '12px sans-serif';
  return ctx.measureText(text);
};
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
