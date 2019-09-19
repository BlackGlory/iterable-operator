import { includes } from '../../src'

test('includes(iterable, sequence) => true', () => {
  const result = includes([1, 2, 3], [2, 3])

  expect(result).toBeTruthy()
})

test('includes(iterable, sequence) => false', () => {
  const result = includes([1, 2, 3], [2, 1])

  expect(result).toBeFalsy()
})

test('includes(iterable, sequence) & sequence = []', () => {
  const result = includes([1, 2, 3], [])

  expect(result).toBeTruthy()
})
