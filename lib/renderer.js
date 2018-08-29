function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * f2 专为适配微信小程序绘图上下文 context 而封装的伪 Canvas
 * @authors (sima.zhang1990@gmail.com)
 * @version 1.0.0
 */

var EventEmitter = require('wolfy87-eventemitter');
var CAPITALIZED_ATTRS_MAP = {
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
  textBaseline: 'TextBaseline'
};

var Renderer = function (_EventEmitter) {
  _inherits(Renderer, _EventEmitter);

  function Renderer(myCtx) {
    _classCallCheck(this, Renderer);

    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

    var self = _this;
    self.ctx = myCtx;
    self.style = {}; // just mock
    self._initContext(myCtx);
    return _this;
  }

  Renderer.prototype.getContext = function getContext(type) {
    if (type === '2d') {
      return this.ctx;
    }
  };

  Renderer.prototype._initContext = function _initContext(myCtx) {
    Object.keys(CAPITALIZED_ATTRS_MAP).map(function (key) {
      Object.defineProperty(myCtx, key, {
        set: function set(value) {
          var name = 'set' + CAPITALIZED_ATTRS_MAP[key];
          myCtx[name](value);
        }
      });
      return key;
    });
  };

  return Renderer;
}(EventEmitter);

module.exports = Renderer;