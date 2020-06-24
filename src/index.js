import F2 from '@antv/f2';
import { my as F2Context } from '@antv/f2-context';

function wrapEvent(e) {
  if (!e) return;
  if (!e.preventDefault) {
    e.preventDefault = function() {};
  }
  return e;
}

Component({
  // mixins: [],
  // data: {},
  props: {
    onInit: () => {}
  },
  didMount() {
    const id = `f2-canvas-${this.$id}`;
    const myCtx = my.createCanvasContext(id);
    const context = F2Context(myCtx);

    const query = my.createSelectorQuery();
    query
      .select(`#${id}`)
      .boundingClientRect()
      .exec(res => {
        // 获取画布实际宽高
        const { width, height } = res[0];
        const pixelRatio = my.getSystemInfoSync().pixelRatio;
        // 高清解决方案
        this.setData({
          id,
          width: width * pixelRatio,
          height: height * pixelRatio
        }, () => {
          const chart = this.props.onInit(F2, { context, width, height, pixelRatio });
          if (chart) {
            this.chart = chart;
            this.canvasEl = chart.get('el');
          }
        });
      });

  },
  // didUpdate() {},
  // didUnmount() {},
  methods: {
    touchStart(e) {
      const canvasEl = this.canvasEl;
      if (!canvasEl) {
        return;
      }
      canvasEl.dispatchEvent('touchstart', wrapEvent(e));
    },
    touchMove(e) {
      const canvasEl = this.canvasEl;
      if (!canvasEl) {
        return;
      }
      canvasEl.dispatchEvent('touchmove', wrapEvent(e));
    },
    touchEnd(e) {
      const canvasEl = this.canvasEl;
      if (!canvasEl) {
        return;
      }
      canvasEl.dispatchEvent('touchend', wrapEvent(e));
    }
  }
});
