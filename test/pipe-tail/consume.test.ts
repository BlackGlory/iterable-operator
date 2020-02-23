import { consume } from '../../src'

test('consume', () => {
  function sum(iterable: Iterable<number>) {
    let result = 0
    for (const value of iterable) {
      result += value
    }
    return result
  }

  const result = consume([1, 2, 3], sum)
  expect(result).toEqual(6)
})
