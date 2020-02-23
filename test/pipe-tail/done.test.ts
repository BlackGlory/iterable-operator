import { done } from '../../src'

test('done(iterable)', () => {
  const result = done('123')

  expect(result).toEqual('3')
})
