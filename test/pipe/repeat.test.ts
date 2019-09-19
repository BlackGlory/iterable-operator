import { head, repeat } from '../../src'

test('repeat(iterable)', () => {
  const result = head(repeat([1, 2, 3]), 5)

  expect([...result]).toEqual([1, 2, 3, 1, 2])
})

test('repeat(iterable, times)', () => {
  const result = repeat([1, 2, 3], 2)

  expect([...result]).toEqual([1, 2, 3, 1, 2, 3])
})

test('repeat(iterable, times) & iterable = []', () => {
  const result = repeat([], 2)

  expect([...result]).toEqual([])
})

test('repeat(iterable, times) & times = 0', () => {
  const result = repeat([1, 2, 3], 0)

  expect([...result]).toEqual([])
})

test('repeat(iterable, times) & times < 0', () => {
  expect(() => repeat([1, 2, 3], -1)).toThrow(RangeError)
})
