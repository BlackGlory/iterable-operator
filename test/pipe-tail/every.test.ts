import { every, $break, $continue } from '../../src'

test('every(iterable, fn) => true', () => {
  const result = every([1, 2, 3], (x, i) => x * i % 2 === 0)
  expect(result).toBeTruthy()
})

test('every(iterable, fn) => false', () => {
  const result = every([1, 2, 3], (x, i) => x * i === 2)
  expect(result).toBeFalsy()
})

test('every(iterable, fn) => never', () => {
  expect(() => every([1, 2, 3], () => { throw new Error('CustomError') })).toThrowError('CustomError')
})

test('every(iterable, fn) & $break()', () => {
  const result = every([1, 2, 3], (x, i) => {
    if (x * i === 2) $break()
    return x * i < 6
  })

  expect(result).toBeTruthy()
})

test('every(iterable, fn) & $continue()', () => {
  const result = every([1, 2, 3], (x, i) => {
    if (x * i === 2) $continue()
    return x * i !== 2
  })

  expect(result).toBeTruthy()
})
