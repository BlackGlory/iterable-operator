import { head } from '../../src'

test('head(iterable)', () => {
  const result = head([1, 2, 3])

  expect([...result]).toEqual([1])
})

test('head(iterable, count)', () => {
  const result = head([1, 2, 3], 2)

  expect([...result]).toEqual([1, 2])
})

test('head(iterable, count) & count = 0', () => {
  const result = head([1, 2, 3], 0)

  expect([...result]).toEqual([])
})

test('head(iterable, count) & count < 0', () => {
  expect(() => head([], -1)).toThrow(RangeError)
})
