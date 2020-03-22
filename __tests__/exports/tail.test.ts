import * as Tail from '@tail/index'
import * as PipeTail from '@style/pipeline/tail'
import * as BindTail from '@style/binding/tail'

test.each([
  ['@tail/index', Tail]
, ['@style/pipeline/tail', PipeTail]
, ['@style/binding/tail', BindTail]
])('%s', (_, target) => {
  const expectedExports: string[] = [
    'consumeAsync'
  , 'consume'
  , 'eachAsync'
  , 'each'
  , 'everyAsync'
  , 'every'
  , 'findAsync'
  , 'find'
  , 'headAsync'
  , 'head'
  , 'includesAsync'
  , 'includes'
  , 'matchAsync'
  , 'match'
  , 'reduceAsync'
  , 'reduce'
  , 'someAsync'
  , 'some'
  , 'tailAsync'
  , 'tail'
  , 'toArrayAsync'
  , 'toArray'
  , 'toSetAsync'
  , 'toSet'

  , 'RuntimeError'
  ].sort()

  const actualExports = Object.keys(target).sort()

  expect(actualExports).toEqual(expectedExports)
})
