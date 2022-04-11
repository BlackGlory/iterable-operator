import * as Tail from '@output/index'
import * as PipeTail from '@style/pipeline/output'
import * as BindTail from '@style/binding/output'

test.each([
  ['@output/index', Tail]
, ['@style/pipeline/output', PipeTail]
, ['@style/binding/output', BindTail]
])('%s', (_, target) => {
  const expectedExports: string[] = [
    'consume'
  , 'eachAsync'
  , 'each'
  , 'everyAsync'
  , 'every'
  , 'findAsync'
  , 'find'
  , 'firstAsync'
  , 'first'
  , 'includesAsync'
  , 'includes'
  , 'matchAsync'
  , 'match'
  , 'reduceAsync'
  , 'reduce'
  , 'someAsync'
  , 'some'
  , 'lastAsync'
  , 'last'
  , 'toArrayAsync'
  , 'toArray'
  , 'toSetAsync'
  , 'toSet'
  , 'count'
  , 'countAsync'
  ].sort()

  const actualExports = Object.keys(target).sort()

  expect(actualExports).toEqual(expectedExports)
})
