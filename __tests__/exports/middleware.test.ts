import * as Body from '@middleware/index'
import * as PipeBody from '@style/pipeline/middleware'
import * as BindBody from '@style/binding/middleware'

test.each([
  ['@middleware/index', Body]
, ['@style/pipeline/middleware', PipeBody]
, ['@style/binding/middleware', BindBody]
])('%s', (_, target) => {
  const expectedExports: string[] = [
    'chunkAsync'
  , 'chunkByAsync'
  , 'chunkBy'
  , 'chunk'
  , 'concatAsync'
  , 'concat'
  , 'dropAsync'
  , 'dropRightAsync'
  , 'dropRight'
  , 'dropUntilAsync'
  , 'dropUntil'
  , 'drop'
  , 'filterAsync'
  , 'filter'
  , 'flattenAsync'
  , 'flattenByAsync'
  , 'flattenBy'
  , 'flattenDeepAsync'
  , 'flattenDeep'
  , 'flatten'
  , 'mapAsync'
  , 'map'
  , 'repeatAsync'
  , 'repeat'
  , 'sliceAsync'
  , 'slice'
  , 'splitAsync'
  , 'splitByAsync'
  , 'splitBy'
  , 'split'
  , 'takeAsync'
  , 'takeRightAsync'
  , 'takeRight'
  , 'takeUntilAsync'
  , 'takeUntil'
  , 'take'
  , 'tapAsync'
  , 'tap'
  , 'toAsyncIterable'
  , 'transformAsync'
  , 'transform'
  , 'uniqAsync'
  , 'uniqByAsync'
  , 'uniqBy'
  , 'uniq'
  , 'zipAsync'
  , 'zip'

  , 'InvalidArgumentError'
  ].sort()

  const actualExports = Object.keys(target).sort()

  expect(actualExports).toEqual(expectedExports)
})
