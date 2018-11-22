const F2 = require('./core');

require('@antv/f2/lib/geom/');
require('@antv/f2/lib/geom/adjust/');

require('@antv/f2/lib/coord/polar'); // polar coordinate
require('@antv/f2/lib/component/axis/circle'); // the axis for polar coordinate

require('@antv/f2/lib/scale/time-cat'); // timeCat scale

require('@antv/f2/lib/component/guide/arc'); // guide components
require('@antv/f2/lib/component/guide/line'); // guide components
require('@antv/f2/lib/component/guide/text'); // guide components
require('@antv/f2/lib/component/guide/tag'); // guide components
require('@antv/f2/lib/component/guide/rect'); // guide components
require('@antv/f2/lib/component/guide/region-filter'); // guide components
require('@antv/f2/lib/component/guide/point'); // guide components

const Tooltip = require('@antv/f2/lib/plugin/tooltip');
const Guide = require('@antv/f2/lib/plugin/guide');
const Legend = require('@antv/f2/lib/plugin/legend');
const Animation = require('@antv/f2/lib/animation/detail');
const ScrollBar = require('@antv/f2/lib/plugin/scroll-bar');
const PieLabel = require('@antv/f2/lib/plugin/pie-label');

F2.Animate = require('@antv/f2/lib/animation/animate');
// register plugins
F2.Chart.plugins.register([ Tooltip, Legend, Guide, Animation, ScrollBar, PieLabel ]);

// add interaction
require('@antv/f2/lib/interaction/pie-select');
require('@antv/f2/lib/interaction/interval-select');
require('@antv/f2/lib/interaction/pan');
F2.Interaction = require('@antv/f2/lib/interaction/base');

module.exports = F2;
