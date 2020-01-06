import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.js',
  output: {
    file: 'es/index.js',
    format: 'esm'
  },
  external: [ '@antv/f2', '@antv/f2-context' ],
  plugins: [
    resolve(),
    commonjs()
  ]
};
