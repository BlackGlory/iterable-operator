import { concat } from '../../src'

test('concat(iterable1: Iterable<string>, iterable2: Iterable<string>)', () => {
  const result = concat([1], [2])

  expect([...result]).toEqual([1, 2])
})

test('concat(iterable1: Iterable<string>, iterable2: Iterable<number>)', () => {
  const result = concat(['1'], [2])

  expect([...result]).toEqual(['1', 2])
})
