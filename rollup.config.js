import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

const config = {
  input: 'src/index.ts',
  output: {
    file: 'dist/app.js',
    sourcemap: true,
    format: 'es',
  },
  plugins: [nodeResolve(), typescript(), terser()],
}

export default config
