import { map, $break, $continue } from '../../src'

test('map(iterable, fn)', () => {
  const result = map([1, 2, 3], (x, i) => x * i)

  expect([...result]).toEqual([0, 2, 6])
})

test('map(iterable, fn) => never', () => {
  expect(() => [...map([1, 2, 3], () => { throw new Error('CustomError') })]).toThrowError('CustomError')
})

test('map(iterable, fn) & $break()', () => {
  const result = map([1, 2, 3], (x, i) => {
    if (x * i === 2) $break()
    return x * i
  })

  expect([...result]).toEqual([0])
})

test('map(iterable, fn) & $continue()', () => {
  const result = map([1, 2, 3], (x, i) => {
    if (x * i === 2) $continue()
    return x * i
  })

  expect([...result]).toEqual([0, 6])
})
