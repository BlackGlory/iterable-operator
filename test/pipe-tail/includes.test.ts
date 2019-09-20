import { includes } from '../../src'

test('includes(iterable, sequence) => true', () => {
  const result = includes('123', '23')

  expect(result).toBeTruthy()
})

test('includes(iterable, sequence) => false', () => {
  const result = includes('123', '32')

  expect(result).toBeFalsy()
})

test('includes(iterable, sequence) & sequence = []', () => {
  const result = includes('123', [])

  expect(result).toBeTruthy()
})
