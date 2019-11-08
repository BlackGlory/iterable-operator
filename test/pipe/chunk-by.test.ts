import { chunkBy } from '../../src'

test('chunkBy(iterable, fn)', () => {
  const result = chunkBy([1, 2, 3], (x, i) => i === 1)

  expect([...result]).toEqual([[1, 2], [3]])
})

test('chunkBy(iterable, fn, drop = true)', () => {
  const result = chunkBy([1, 0, 2], x => x === 0, true)

  expect([...result]).toEqual([[1], [2]])
})
