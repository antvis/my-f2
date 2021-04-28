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
    onInit: () => {},
    // width height 会作为元素兜底的宽高使用
    width: null,
    height: null
  },
  didMount() {
    const pageId = this.$page && this.$page.$id || 0;
    const id = `f2-canvas-${pageId}-${this.$id}`;
    const myCtx = my.createCanvasContext(id, { page: this.$page });
    const context = F2Context(myCtx);

    this.setData({
      $pageId: pageId
    });
    const query = my.createSelectorQuery({ page: this.$page });
    query
      .select(`#${id}`)
      .boundingClientRect()
      .exec(res => {
        // 获取画布实际宽高, 用props的宽高做失败兜底
        const { width, height } = res && res[0] ? res[0] : this.props;
        if (!width || !height) {
          return;
        }
        const pixelRatio = my.getSystemInfoSync().pixelRatio;
        // 高清解决方案
        this.setData({
          id,
          width: width * pixelRatio,
          height: height * pixelRatio
        }, () => {
          const ref = this;
          const chart = this.props.onInit(F2, { context, width, height, pixelRatio }, ref);
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
