import { toSet } from '../../src'

test('toSet', () => {
  const result = toSet('123')
  expect(result instanceof Set).toBeTruthy()
  expect(Array.from(result)).toEqual(['1', '2', '3'])
})
