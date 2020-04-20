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
  , 'transformAsync'
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
  , 'transform'
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
  , 'first'
  , 'includes'
  , 'match'
  , 'reduce'
  , 'some'
  , 'last'
  , 'toArray'
  , 'toSet'
  ].sort()

  const actualMethods = Object.getOwnPropertyNames(IterableOperator.prototype).sort()

  expect(expectedMethods).toEqual(actualMethods)
})
