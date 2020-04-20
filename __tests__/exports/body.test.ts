import * as Body from '@body/index'
import * as PipeBody from '@style/pipeline/body'
import * as BindBody from '@style/binding/body'

test.each([
  ['@body/index', Body]
, ['@style/pipeline/body', PipeBody]
, ['@style/binding/body', BindBody]
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
  , 'InvalidArgumentsLengthError'
  ].sort()

  const actualExports = Object.keys(target).sort()

  expect(actualExports).toEqual(expectedExports)
})
