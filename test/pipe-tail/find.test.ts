import { find, $break, $continue } from '../../src'

test('find<T>(iterable: Iterable<T>, fn) => T', () => {
  const result = find([1, 2, 3], (x, i) => x * i === 6)

  expect(result).toBe(3)
})

test('find(iterable, fn) => void', () => {
  const result = find([1, 2, 3], (x, i) => x * i > 6)

  expect(result).toBeUndefined()
})

test('find(iterable, fn) => never', () => {
  expect(() => find([1, 2, 3], () => { throw new Error('CustomError') })).toThrowError('CustomError')
})

test('find(iterable, fn) & $break()', () => {
  const result = find([1, 2, 3], (x, i) => {
    if (x * i === 2) $break()
    return x * i === 2
  })

  expect(result).toBeUndefined()
})

test('find(iterable, fn) & $continue()', () => {
  const result = find([1, 2, 3], (x, i) => {
    if (x * i === 2) $continue()
    return x * i > 0
  })

  expect(result).toBe(3)
})
