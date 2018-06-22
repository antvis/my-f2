import Renderer from './renderer';
import F2 from '@antv/f2';

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

// 由于支付宝小程序不支持 measureText 方法，故用此方法 mock
F2.Util.measureText = function(text, font) {
  let fontSize = 12;
  if (font) {
    fontSize = parseInt(font.split(' ')[3], 10);
  }
  fontSize /= 2;
  return {
    width: strLen(text) * fontSize
  };
};

F2.Util.addEventListener = function(source, type, listener) {
  source.addListener(type, listener);
};

F2.Util.removeEventListener = function(source, type, listener) {
  source.removeListener(type, listener);
};

F2.Util.createEvent = function(event, chart) {
  // const pixelRatio = chart.get('pixelRatio') || 1;
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
    // x: x * pixelRatio,
    // y: y * pixelRatio
  };
};

F2.Renderer = Renderer;
export default F2;
