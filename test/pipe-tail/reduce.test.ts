import { reduce, $break, $continue } from '../../src'

test('reduce(iterable, fn)', () => {
  const result = reduce([1, 2, 3], (ret: number | undefined, cur, i) => (ret || 1) * cur * (i + 1))

  // 1 * 1 * 1 = 1
  // 1 * 2 * 2 = 4
  // 4 * 3 * 3 = 36

  expect(result).toBe(36)
})

test('reduce(iterable, fn) => never', () => {
  expect(() => reduce([1, 2, 3], () => { throw new Error('CustomError') })).toThrowError('CustomError')
})

test('reduce(iterable, fn) & $break()', () => {
  const result = reduce([1, 2, 3], (ret, cur, i) => {
    if (i === 1) $break()
    return ret * cur * (i + 1)
  }, 1)

  // 1 * 1 * 1 = 1

  expect(result).toBe(1)
})

test('reduce(iterable, fn) & $continue()', () => {
  const result = reduce([1, 2, 3], (ret, cur, i) => {
    if (i === 1) $continue()
    return ret * cur * (i + 1)
  }, 1)

  // 1 * 1 * 1 = 1
  // 1 * 3 * 3 = 9

  expect(result).toBe(9)
})

test('reduce(iterable, fn, initialValue)', () => {
  const result = reduce([1, 2, 3], (ret, cur, i) => ret * cur * (i + 1), 1)

  expect(result).toBe(36)
})

test('reduce(iterable: Iterable<number>, fn, initialValue: [])', () => {
  const result = reduce<number, number[]>([1, 2, 3], (ret, cur, i) => (ret.push(cur * i), ret), [])

  expect(result).toEqual([0, 2, 6])
})
