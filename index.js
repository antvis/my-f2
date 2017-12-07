import Chart from './src/chart';
import F2 from '@antv/f2';

const MyF2 = {};

Object.keys(F2).map(key => {
  MyF2[key] = F2[key];
});

MyF2.Chart = Chart;

export default MyF2;
