import typescript from '@rollup/plugin-typescript'

function createOptions({ directory, target }) {
  return [
    {
      input: 'src/index.ts'
    , output: createOutput(directory, 'index')
    , plugins: createPlugins(target)
    }
  , {
      input: 'src/style/pipeline/index.ts'
    , output: createOutput(directory, 'pipeline')
    , plugins: createPlugins(target)
    }
  , {
      input: 'src/style/binding/index.ts'
    , output: createOutput(directory, 'binding')
    , plugins: createPlugins(target)
    }
  , {
      input: 'src/style/chaining/index.ts'
    , output: createOutput(directory, 'chaining')
    , plugins: createPlugins(target)
    }
  ]

  function createOutput(directory, name) {
    return [
      {
        file: `dist/${directory}/${name}.mjs`
      , format: 'es'
      }
    , {
        file: `dist/${directory}/${name}.umd.js`
      , format: 'umd'
      , name: 'IterableOperator'
      }
    ]
  }

  function createPlugins(target) {
    return [
      typescript({ target })
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
