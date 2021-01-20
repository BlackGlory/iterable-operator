import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import analyze from 'rollup-plugin-analyzer'
import replace from '@rollup/plugin-replace'

const UMD_NAME = 'IterableOperator'

export default [
  ...createOptions({
    directory: 'es2015'
  , target: 'ES2015'
  })
, ...createOptions({
    directory: 'es2018'
  , target: 'ES2018'
  })
]

function createOptions({ directory, target }) {
  const commonPlugins = [
    replace({
      'Object.defineProperty(exports, "__esModule", { value: true });': ''
    , delimiters: ['\n', '\n']
    })
  , resolve({ browser: true })
  , commonjs()
  , json()
  , typescript({ target })
  ]

  return [
    {
      input: 'src/index.ts'
    , output: createOutput('index')
    , plugins: [
        ...commonPlugins
      , analyze({ summaryOnly: true })
      ]
    }
  , {
      input: 'src/style/pipeline/index.ts'
    , output: createOutput('pipeline')
    , plugins: [
        ...commonPlugins
      , analyze({ summaryOnly: true })
      ]
    }
  , {
      input: 'src/style/binding/index.ts'
    , output: createOutput('binding')
    , plugins: [
        ...commonPlugins
      , analyze({ summaryOnly: true })
      ]
    }
  , {
      input: 'src/style/chaining/index.ts'
    , output: createOutput('chaining')
    , plugins: [
        ...commonPlugins
      , analyze({ summaryOnly: true })
      ]
    }

  , {
      input: 'src/index.ts'
    , output: createMinification('index')
    , plugins: [
        ...commonPlugins
      , terser()
      ]
    }
  , {
      input: 'src/style/pipeline/index.ts'
    , output: createMinification('pipeline')
    , plugins: [
        ...commonPlugins
      , terser()
      ]
    }
  , {
      input: 'src/style/binding/index.ts'
    , output: createMinification('binding')
    , plugins: [
        ...commonPlugins
      , terser()
      ]
    }
  , {
      input: 'src/style/chaining/index.ts'
    , output: createMinification('chaining')
    , plugins: [
        ...commonPlugins
      , terser()
      ]
    }
  ]

  function createOutput(name) {
    return [
      {
        file: `dist/${directory}/${name}.mjs`
      , format: 'es'
      , sourcemap: true
      }
    , {
        file: `dist/${directory}/${name}.umd.js`
      , format: 'umd'
      , name: UMD_NAME
      , sourcemap: true
      }
    ]
  }

  function createMinification(name) {
    return [
      {
        file: `dist/${directory}/${name}.min.mjs`
      , format: 'es'
      , sourcemap: true
      }
    , {
        file: `dist/${directory}/${name}.umd.min.js`
      , format: 'umd'
      , name: UMD_NAME
      , sourcemap: true
      }
    ]
  }
}
