import Render from './render';
import F2 from '@antv/f2';

class Chart extends F2.Chart {
  constructor(cfg) {
    const { el, width, height } = cfg;
    if (!(el && width && height)) {
      throw new Error('Please specify the el, width and height!');
    }

    const render = new Render(el);
    cfg.el = render;
    super(cfg);
  }
}

export default Chart;
