import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'

const UMD_NAME = 'IterableOperator'

function createOptions({ directory, target }) {
  return [
    {
      input: 'src/index.ts'
    , output: createOutput('index')
    , plugins: [
        typescript({ target })
      , json()
      , resolve()
      , commonjs()
      ]
    }
  , {
      input: 'src/style/pipeline/index.ts'
    , output: createOutput('pipeline')
    , plugins: [
        typescript({ target })
      , json()
      , resolve()
      , commonjs()
      ]
    }
  , {
      input: 'src/style/binding/index.ts'
    , output: createOutput('binding')
    , plugins: [
        typescript({ target })
      , json()
      , resolve()
      , commonjs()
      ]
    }
  , {
      input: 'src/style/chaining/index.ts'
    , output: createOutput('chaining')
    , plugins: [
        typescript({ target })
      , json()
      , resolve()
      , commonjs()
      ]
    }

  , {
      input: 'src/index.ts'
    , output: createMinification('index')
    , plugins: [
        typescript({ target })
      , json()
      , resolve()
      , commonjs()
      , terser()
      ]
    }
  , {
      input: 'src/style/pipeline/index.ts'
    , output: createMinification('pipeline')
    , plugins: [
        typescript({ target })
      , json()
      , resolve()
      , commonjs()
      , terser()
      ]
    }
  , {
      input: 'src/style/binding/index.ts'
    , output: createMinification('binding')
    , plugins: [
        typescript({ target })
      , json()
      , resolve()
      , commonjs()
      , terser()
      ]
    }
  , {
      input: 'src/style/chaining/index.ts'
    , output: createMinification('chaining')
    , plugins: [
        typescript({ target })
      , json()
      , resolve()
      , commonjs()
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
