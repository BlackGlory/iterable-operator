import { flattenDeep } from '../../src'

test('flattenDeep(iterable: Iterable<string | number[]>)', () => {
  const result = flattenDeep(['123', [1, [2, [3]]]])

  expect([...result]).toEqual(['1', '2', '3', 1, 2, 3])
})

test('flattenDeep(iterable: Iterable<string | number[]>, depth, exclude = string => true)', () => {
  const result = flattenDeep(['123', [1, [2, [3]]]], 2, x => typeof x === 'string')

  expect([...result]).toEqual(['123', 1, 2, [3]])
})

test('flattenDeep(iterable, depth)', () => {
  const result = flattenDeep<number>([0, [1, [2, [3]]]], 2)

  expect([...result]).toEqual([0, 1, 2, [3]])
})

test('flattenDeep(iterable, depth) & depth = 0', () => {
  const result = flattenDeep<number>([0, [1]], 0)

  expect([...result]).toEqual([0, [1]])
})

test('flattenDeep(iterable, depth) & depth < 0', () => {
  expect(() => flattenDeep([], -1)).toThrow(RangeError)
})
