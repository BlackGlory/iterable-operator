import { chunk } from '../../src'

test('chunk(iterable, length)', () => {
  const result = chunk([1, 2, 3], 2)

  expect([...result]).toEqual([[1, 2], [3]])
})

test('chunk(iterable, length) & length = 0', () => {
  expect(() => chunk([1, 2, 3], 0)).toThrow(RangeError)
})

test('chunk(iterable, length) & length < 0', () => {
  expect(() => chunk([1, 2, 3], -1)).toThrow(RangeError)
})
