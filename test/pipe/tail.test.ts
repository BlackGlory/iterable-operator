import { tail } from '../../src'

test('tail(iterable)', () => {
  const result = tail([1, 2, 3])

  expect([...result]).toEqual([3])
})

test('tail(iterable, count)', () => {
  const result = tail([1, 2, 3], 2)

  expect([...result]).toEqual([2, 3])
})

test('tail(iterable, count) & count = 0', () => {
  const result = tail([1, 2, 3], 0)

  expect([...result]).toEqual([])
})

test('tail(iterable, count) & count < 0', () => {
  expect(() => tail([], -1)).toThrow(RangeError)
})
