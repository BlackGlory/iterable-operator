import { concat } from '../../src'

test('concat()', () => {
  expect(() => concat()).toThrowError('At least 2 argument required, but only 0 present.')
})

test('concat(iterable)', () => {
  expect(() => concat('1')).toThrowError('At least 2 argument required, but only 1 present.')
})

test('concat(iterable1: Iterable<string>, iterable2: Iterable<string>)', () => {
  const result = concat([1], [2])

  expect([...result]).toEqual([1, 2])
})

test('concat(iterable1: Iterable<string>, iterable2: Iterable<number>)', () => {
  const result = concat('1', [2])

  expect([...result]).toEqual(['1', 2])
})

test('concat(iterable1, iterable2, iterable3, iterable4, iterable5, iterable6, iterable7, iterable8)', () => {
  const result = concat<string | number>('1', [2], '3', [4], '5', [6], '7', [8])

  expect([...result]).toEqual(['1', 2, '3', 4, '5', 6, '7', 8])
})
