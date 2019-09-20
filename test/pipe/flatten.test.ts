import { flatten } from '../../src'

test('flatten(iterable)', () => {
  const result = flatten([1, [2, [3]]])

  expect([...result]).toEqual([1, 2, 3])
})

test('flatten(iterable: Iterable<string>)', () => {
  const result = flatten('123')

  expect([...result]).toEqual(['1', '2', '3'])
})

test('flatten(iterable, depth)', () => {
  const result = flatten([1, [2, [3]]], 1)

  expect([...result]).toEqual([1, 2, [3]])
})

test('flatten(iterable, depth) & depth = 0', () => {
  const result = flatten([1, [2, [3]]], 0)

  expect([...result]).toEqual([1, [2, [3]]])
})

test('flatten(iterable, depth) & depth < 0', () => {
  expect(() => flatten([], -1)).toThrow(RangeError)
})
