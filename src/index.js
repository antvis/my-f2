import F2 from '@antv/f2';
import { my as F2Context } from '@antv/f2-context';

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
        });
        this.chart = this.props.onInit(F2, { context, width, height, pixelRatio });
      });

  },
  // didUpdate() {},
  // didUnmount() {},
  methods: {
    touchStart(e) {
      if (this.chart) {
        this.chart.get('el').dispatchEvent('touchstart', e);
      }
    },
    touchMove(e) {
      if (this.chart) {
        this.chart.get('el').dispatchEvent('touchmove', e);
      }
    },
    touchEnd(e) {
      if (this.chart) {
        this.chart.get('el').dispatchEvent('touchend', e);
      }
    }
  }
});
