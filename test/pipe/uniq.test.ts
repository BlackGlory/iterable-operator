import { uniq } from '../../src'

test('uniq(iterable)', () => {
  const result = uniq([1, 1, 2, 2, 3, 3])

  expect([...result]).toEqual([1, 2, 3])
})
