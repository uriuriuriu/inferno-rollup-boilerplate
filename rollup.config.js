import babel from 'rollup-plugin-babel'
import eslint from 'rollup-plugin-eslint'
import replace from 'rollup-plugin-replace'
import globals from 'rollup-plugin-node-globals'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'
import sass from 'rollup-plugin-sass'

// utils
const isProduction = process.env.NODE_ENV === 'production'

const PATHS = {
  src: 'src/index.js',
  dist: 'build/bundle.js'
}

// config
export default {

  entry: PATHS.src,
  dest: PATHS.dist,
  sourceMap: 'inline',
  format: 'iife',

  plugins: [
    // sass
    sass({ insert: true, output: false }),
    // replace
    replace({
      exclude: 'node_modules/**',
      ['process.env.NODE_ENV']: JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    // bundle
    commonjs({
      namedExports: {},
      include: ['node_modules/**/*.js']
    }),
    // lint
    eslint({ exclude: 'src/styles/**' }),
    // transpile
    babel({ exclude: 'node_modules/**' }),
    // globals
    globals(),
    // resolve
    resolve({ jsnext: true, browser: true, main: true }),
    // uglify
    (isProduction && uglify()),
  ]

}
