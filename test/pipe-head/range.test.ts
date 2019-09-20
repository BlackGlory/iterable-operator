import { range } from '../../src'

test('range(end) & end > 0', () => {
  const result = range(5)

  expect([...result]).toEqual([0, 1, 2, 3, 4])
})

test('range(end) & end < 0', () => {
  const result = range(-5)

  expect([...result]).toEqual([0, -1, -2, -3, -4])
})

test('range(end) & end = 0', () => {
  const result = range(0)

  expect([...result]).toEqual([])
})

test('range(start, end) & start = end', () => {
  const result = range(1, 1)

  expect([...result]).toEqual([])
})

test('range(start, end) & start < end', () => {
  const result = range(-2, 2)

  expect([...result]).toEqual([-2, -1, 0, 1])
})

test('range(start, end) & start > end', () => {
  const result = range(2, -2)

  expect([...result]).toEqual([2, 1, 0, -1])
})

test('range(start, end, step)', () => {
  const result = range(1, -1, 0.5)

  expect([...result]).toEqual([1, 0.5, 0, -0.5])
})

test('range(start, end, step) & step < 0', () => {
  expect(() => range(1, -1, -0.5)).toThrow(RangeError)
})
