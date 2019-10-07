import { chunkBy } from '../../src'

test('chunkBy(iterable, fn)', () => {
  const result = chunkBy([1, 2, 3], (x, i) => i === 1)

  expect([...result]).toEqual([[1, 2], [3]])
})
