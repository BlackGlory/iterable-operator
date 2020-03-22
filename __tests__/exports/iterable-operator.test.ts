import { IterableOperator } from '@style/chaining/iterable-operator'

test('IterableOperator', () => {
  const expectedMethods = [
    'constructor'

  , 'chunkByAsync'
  , 'concatAsync'
  , 'dropUntilAsync'
  , 'filterAsync'
  , 'flattenByAsync'
  , 'mapAsync'
  , 'splitByAsync'
  , 'takeUntilAsync'
  , 'tapAsync'
  , 'uniqByAsync'
  , 'zipAsync'

  , 'chunkBy'
  , 'chunk'
  , 'concat'
  , 'dropRight'
  , 'dropUntil'
  , 'drop'
  , 'filter'
  , 'flattenBy'
  , 'flattenDeep'
  , 'flatten'
  , 'map'
  , 'repeat'
  , 'slice'
  , 'splitBy'
  , 'split'
  , 'takeRight'
  , 'takeUntil'
  , 'take'
  , 'tap'
  , 'toAsyncIterable'
  , 'uniqBy'
  , 'uniq'
  , 'zip'

  , 'eachAsync'
  , 'everyAsync'
  , 'findAsync'
  , 'reduceAsync'
  , 'someAsync'

  , 'consume'
  , 'each'
  , 'every'
  , 'find'
  , 'head'
  , 'includes'
  , 'match'
  , 'reduce'
  , 'some'
  , 'tail'
  , 'toArray'
  , 'toSet'
  ].sort()

  const actualMethods = Object.getOwnPropertyNames(IterableOperator.prototype).sort()

  expect(expectedMethods).toEqual(actualMethods)
})
