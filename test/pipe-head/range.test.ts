import { range, head, tail } from '../../src'

test('range() & head()', () => {
  const first = head(range(), 2)

  expect([...first]).toEqual([Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER + 1])
})

test('range() & tail()', () => {
  const last = tail(range(Number.MAX_SAFE_INTEGER - 1), 2)

  expect([...last]).toEqual([Number.MAX_SAFE_INTEGER - 1, Number.MAX_SAFE_INTEGER])
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
