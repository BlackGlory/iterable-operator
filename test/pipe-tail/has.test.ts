import { has } from '../../src'

test('has(iterable, value) => true', () => {
  const result = has([1, 2, 3], 2)

  expect(result).toBeTruthy()
})

test('has(iterable, value) => false', () => {
  const result = has([1, 2, 3], 4)

  expect(result).toBeFalsy()
})
