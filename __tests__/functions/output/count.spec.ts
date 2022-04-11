import { count } from '@output/count'

test('count(iterable: Iterable<unknown>): number', () => {
  const iter = [1, 2, 3]

  const result = count(iter)

  expect(result).toBe(3)
})
