import { zip } from '../../src'

test('zip(iterable)', () => {
  const result = zip([1, 2, 3])

  expect([...result]).toEqual([[1], [2], [3]])
})

test('zip(iterable1: Iterable<number>, iterable2: Iterable<string>) & iterable1.length = iterable2.length', () => {
  const result = zip([1, 2, 3], ['a', 'b', 'c'])

  expect([...result]).toEqual([[1, 'a'], [2, 'b'], [3, 'c']])
})

test('zip(iterable1: Iterable<number>, iterable2: Iterable<string>) & iterable1.length > iterable2.length', () => {
  const result = zip([1, 2, 3], ['a', 'b'])

  expect([...result]).toEqual([[1, 'a'], [2, 'b'], [3, undefined]])
})
