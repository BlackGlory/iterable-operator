import { slice } from '../../src'

test('slice(iterable)', () => {
  const result = slice([1, 2, 3])

  expect([...result]).toEqual([1, 2, 3])
})

test('slice(iterable, start)', () => {
  const result = slice([1, 2, 3], 1)

  expect([...result]).toEqual([2, 3])
})

test('slice(iterable, start, end)', () => {
  const result = slice([1, 2, 3], 1, 2)

  expect([...result]).toEqual([2])
})

test('slice(iterable, start) & start > iterable.length', () => {
  const result = slice([1, 2, 3], 3)

  expect([...result]).toEqual([])
})

test('slice(iterable, start) & start < 0', () => {
  expect(() => slice([], -1)).toThrow(RangeError)
})

test('slice(iterable, start, end) & start >= end', () => {
  expect(() => slice([], 2, 1)).toThrow(RangeError)
})
