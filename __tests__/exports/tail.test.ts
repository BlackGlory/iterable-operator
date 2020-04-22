import * as Tail from '@tail/index'
import * as PipeTail from '@style/pipeline/tail'
import * as BindTail from '@style/binding/tail'

test.each([
  ['@tail/index', Tail]
, ['@style/pipeline/tail', PipeTail]
, ['@style/binding/tail', BindTail]
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

  , 'RuntimeError'
  ].sort()

  const actualExports = Object.keys(target).sort()

  expect(actualExports).toEqual(expectedExports)
})
