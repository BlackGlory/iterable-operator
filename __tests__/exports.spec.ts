import * as Index from '@src/index'

test('Index', () => {
  const expectedExports: string[] = [
    'isIterable'
  , 'isntIterable'
  , 'isAsyncIterable'
  , 'isntAsyncIterable'
  , 'chunk'
  , 'chunkAsync'
  , 'chunkBy'
  , 'chunkByAsync'
  , 'concat'
  , 'concatAsync'
  , 'difference'
  , 'differenceAsync'
  , 'drop'
  , 'dropAsync'
  , 'dropRight'
  , 'dropRightAsync'
  , 'dropUntil'
  , 'dropUntilAsync'
  , 'filter'
  , 'filterAsync'
  , 'flatten'
  , 'flattenAsync'
  , 'flattenBy'
  , 'flattenByAsync'
  , 'flattenDeep'
  , 'flattenDeepAsync'
  , 'intersection'
  , 'intersectionAsync'
  , 'flatMap'
  , 'flatMapAsync'
  , 'map'
  , 'mapAsync'
  , 'repeat'
  , 'repeatAsync'
  , 'slice'
  , 'sliceAsync'
  , 'join'
  , 'joinAsync'
  , 'splitBy'
  , 'splitByAsync'
  , 'split'
  , 'splitAsync'
  , 'take'
  , 'takeAsync'
  , 'takeRight'
  , 'takeRightAsync'
  , 'takeUntil'
  , 'takeUntilAsync'
  , 'tap'
  , 'tapAsync'
  , 'toAsyncIterable'
  , 'transform'
  , 'transformAsync'
  , 'uniqAsync'
  , 'uniqByAsync'
  , 'uniq'
  , 'uniqBy'
  , 'zip'
  , 'zipAsync'
  , 'consume'
  , 'consumeAsync'
  , 'each'
  , 'eachAsync'
  , 'every'
  , 'everyAsync'
  , 'find'
  , 'findAsync'
  , 'findAllIndexes'
  , 'first'
  , 'firstAsync'
  , 'includes'
  , 'includesAsync'
  , 'reduce'
  , 'reduceAsync'
  , 'some'
  , 'someAsync'
  , 'last'
  , 'lastAsync'
  , 'toArray'
  , 'toArrayAsync'
  , 'toSet'
  , 'toSetAsync'
  , 'count'
  , 'countAsync'
  , 'groupBy'
  , 'groupByAsync'
  , 'prefetch'
  , 'prefetchAsync'
  ].sort()

  const actualExports = Object.keys(Index).sort()

  expect(actualExports).toEqual(expectedExports)
})
