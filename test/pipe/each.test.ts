import { each, $break, $continue } from '../../src'

test('each(iterable, fn)', () => {
  const sideResult: number[] = []
  const result = each([1, 2, 3], (x, i) => sideResult.push(x * i))

  expect(sideResult).toEqual([])
  expect([...result]).toEqual([1, 2, 3])
  expect(sideResult).toEqual([0, 2, 6])
})

test('each(iterable, fn) => never', () => {
  expect(() => [...each([1, 2, 3], () => { throw new Error('CustomError') })]).toThrowError('CustomError')
})

test('each(iterable, fn) & $break()', () => {
  const sideResult: number[] = []
  const result = each([1, 2, 3], (x, i) => {
    if (x * i === 2) $break()
    sideResult.push(x * i)
  })

  expect(sideResult).toEqual([])
  expect([...result]).toEqual([1])
  expect(sideResult).toEqual([0])
})

test('each(iterable, fn) & $continue()', () => {
  const sideResult: number[] = []
  const result = each([1, 2, 3], (x, i) => {
    if (x * i === 2) $continue()
    sideResult.push(x * i)
  })

  expect(sideResult).toEqual([])
  expect([...result]).toEqual([1, 3])
  expect(sideResult).toEqual([0, 6])
})
