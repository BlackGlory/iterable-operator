import { count } from '@terminal/count'

test('count', () => {
  const iter = [1, 2, 3]

  const result = count(iter)

  expect(result).toBe(3)
})
