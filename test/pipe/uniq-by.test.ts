import { uniqBy, $break, $continue } from '../../src'

test('uniqBy(iterable, fn)', () => {
  const result = uniqBy([1, 2, 3], (x, i) => x * i > 0)

  expect([...result]).toEqual([1, 2])
})

test('uniqBy(iterable, fn) => never', () => {
  expect(() => [...uniqBy([1, 2, 3], () => { throw new Error('CustomError') })]).toThrowError('CustomError')
})

test('uniqBy(iterable, fn) & $break', () => {
  const result = uniqBy([1, 2, 3], (x, i) => {
    if (x * i === 2) $break()
    return x * i > 0
  })

  expect([...result]).toEqual([1])
})

test('uniqBy(iterable, fn) & $continue', () => {
  const result = uniqBy([1, 2, 3], (x, i) => {
    if (x * i === 2) $continue()
    return x * i > 0
  })

  expect([...result]).toEqual([1, 3])
})
