import { done } from '../../src'

test('done(iterable)', () => {
  const result = done([1, 2, 3])

  expect(result).toEqual([1, 2, 3])
})

test('done(iterable, factory)', () => {
  const result = done([1, 2, 3], it => new Set(it))

  expect(result).toBeInstanceOf(Set)
  expect([...result]).toEqual([1, 2, 3])
})
