import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'
import commonjs from 'rollup-plugin-commonjs'

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/ReModulex.min.js',
      format: 'cjs'
    },
    external: ['react'],
    plugins: [
      resolve(),
      commonjs({
        include: 'node_modules/**'
      }),
      babel({
        exclude: 'node_modules/**'
      }),
      uglify()
    ]
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/ReModulex.js',
      format: 'cjs'
    },
    external: ['react'],
    plugins: [
      resolve(),
      commonjs({
        include: 'node_modules/**'
      }),
      babel({
        exclude: 'node_modules/**'
      })
    ]
  }
]
