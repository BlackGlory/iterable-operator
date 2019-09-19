import { filter, $break, $continue } from '../../src'

test('filter(iterable, fn)', () => {
  const result = filter([1, 2, 3], (x, i) => x * i === 2)

  expect([...result]).toEqual([2])
})

test('filter(iterable, fn) => never', () => {
  expect(() => [...filter([1, 2, 3], () => { throw new Error('CustomError') })]).toThrowError('CustomError')
})

test('filter(iterable, fn) & $break()', () => {
  const result = filter([1, 2, 3], (x, i) => {
    if (x * i === 2) $break()
    return true
  })

  expect([...result]).toEqual([1])
})

test('filter(iterable, fn) & $continue()', () => {
  const result = filter([1, 2, 3], (x, i) => {
    if (x * i === 2) $continue()
    return true
  })

  expect([...result]).toEqual([1, 3])
})
