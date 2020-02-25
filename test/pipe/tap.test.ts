import { tap, $break, $continue } from '../../src'

test('tap(iterable, fn)', () => {
  const sideResult: number[] = []
  const result = tap([1, 2, 3], (x, i) => sideResult.push(x * i))

  expect(sideResult).toEqual([])
  expect([...result]).toEqual([1, 2, 3])
  expect(sideResult).toEqual([0, 2, 6])
})

test('tap(iterable, fn) => never', () => {
  expect(() => [...tap([1, 2, 3], () => { throw new Error('CustomError') })]).toThrowError('CustomError')
})

test('tap(iterable, fn) & $break()', () => {
  const sideResult: number[] = []
  const result = tap([1, 2, 3], (x, i) => {
    if (x * i === 2) $break()
    sideResult.push(x * i)
  })

  expect(sideResult).toEqual([])
  expect([...result]).toEqual([1])
  expect(sideResult).toEqual([0])
})

test('tap(iterable, fn) & $continue()', () => {
  const sideResult: number[] = []
  const result = tap([1, 2, 3], (x, i) => {
    if (x * i === 2) $continue()
    sideResult.push(x * i)
  })

  expect(sideResult).toEqual([])
  expect([...result]).toEqual([1, 3])
  expect(sideResult).toEqual([0, 6])
})
