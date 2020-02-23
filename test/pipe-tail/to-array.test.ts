import { toArray } from '../../src'

test('toArray', () => {
  const result = toArray('123')
  expect(result).toEqual(['1', '2', '3'])
})
