import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

function createOptions({ directory, target }) {
  return [
    {
      input: 'src/index.ts'
    , output: createOutput('index')
    , plugins: [
        typescript({ target })
      ]
    }
  , {
      input: 'src/style/pipeline/index.ts'
    , output: createOutput('pipeline')
    , plugins: [
        typescript({ target })
      ]
    }
  , {
      input: 'src/style/binding/index.ts'
    , output: createOutput('binding')
    , plugins: [
        typescript({ target })
      ]
    }
  , {
      input: 'src/style/chaining/index.ts'
    , output: createOutput('chaining')
    , plugins: [
        typescript({ target })
      ]
    }

  , {
      input: 'src/index.ts'
    , output: createMinification('index')
    , plugins: [
        typescript({ target })
      , terser()
      ]
    }
  , {
      input: 'src/style/pipeline/index.ts'
    , output: createMinification('pipeline')
    , plugins: [
        typescript({ target })
      , terser()
      ]
    }
  , {
      input: 'src/style/binding/index.ts'
    , output: createMinification('binding')
    , plugins: [
        typescript({ target })
      , terser()
      ]
    }
  , {
      input: 'src/style/chaining/index.ts'
    , output: createMinification('chaining')
    , plugins: [
        typescript({ target })
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
      , name: 'IterableOperator'
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
      , name: 'IterableOperator'
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
