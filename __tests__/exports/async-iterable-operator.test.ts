import { AsyncIterableOperator } from '@style/chaining/async-iterable-operator'

test('AsyncIterableOperator', () => {
  const expectedMethods = [
    'constructor'

  , 'chunkAsync'
  , 'chunkByAsync'
  , 'concatAsync'
  , 'dropAsync'
  , 'dropRightAsync'
  , 'dropUntilAsync'
  , 'filterAsync'
  , 'flattenAsync'
  , 'flattenByAsync'
  , 'flattenDeepAsync'
  , 'mapAsync'
  , 'repeatAsync'
  , 'sliceAsync'
  , 'splitAsync'
  , 'splitByAsync'
  , 'takeAsync'
  , 'takeRightAsync'
  , 'takeUntilAsync'
  , 'tapAsync'
  , 'uniqAsync'
  , 'uniqByAsync'
  , 'zipAsync'

  , 'consumeAsync'
  , 'eachAsync'
  , 'everyAsync'
  , 'findAsync'
  , 'firstAsync'
  , 'includesAsync'
  , 'matchAsync'
  , 'reduceAsync'
  , 'someAsync'
  , 'lastAsync'
  , 'toArrayAsync'
  , 'toSetAsync'
  ].sort()

  const actualMethods = Object.getOwnPropertyNames(AsyncIterableOperator.prototype).sort()

  expect(expectedMethods).toEqual(actualMethods)
})
