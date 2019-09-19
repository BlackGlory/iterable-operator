import { some, $break, $continue } from '../../src'

test('some(iterable, fn) => true', () => {
  const result = some([1, 2, 3], (x, i) => x * i === 2)

  expect(result).toBeTruthy()
})

test('some(iterable, fn) => false', () => {
  const result = some([1, 2, 3], (x, i) => x * i < 0)

  expect(result).toBeFalsy()
})

test('some(iterable, fn) => never', () => {
  expect(() => some([1, 2, 3], () => { throw new Error('CustomError') })).toThrowError('CustomError')
})

test('some(iterable, fn) & $break()', () => {
  const result = some([1, 2, 3], (x, i) => {
    if (x * i === 2) $break()
    return x * i === 2
  })

  expect(result).toBeFalsy()
})

test('some(iterable, fn) & $continue()', () => {
  const result = some([1, 2, 3], (x, i) => {
    if (x * i === 2) $continue()
    return x * i === 2
  })

  expect(result).toBeFalsy()
})
