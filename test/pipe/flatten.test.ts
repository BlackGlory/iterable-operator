import { flatten } from '../../src'

test('flatten(iterable)', () => {
  const result = flatten<number>([1, [2, [3]]])

  expect([...result]).toEqual([1, 2, [3]])
})

test('flatten(iterable: Iterable<string | number[]>)', () => {
  const result = flatten(['123', [1, [2, [3]]]])

  expect([...result]).toEqual(['1', '2', '3', 1, [2, [3]]])
})

test('flatten(iterable: Iterable<string | number[]>, exclude string)', () => {
  const result = flatten(['123', [1, [2, [3]]]], x => typeof x === 'string')

  expect([...result]).toEqual(['123', 1, [2, [3]]])
})
