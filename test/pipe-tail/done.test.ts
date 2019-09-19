import { done } from '../../src'

test('done(iterable)', () => {
  const result = done([1, 2, 3])

  expect(result).toEqual([1, 2, 3])
})
