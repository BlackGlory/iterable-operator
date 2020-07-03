import * as output from '@output/match'
import { match } from '@style/binding/output/match'

describe('match<T>(this: Iterable<T>, sequence: ArrayLike<T>): boolean', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(output, 'match')
    const iter = [1, 2, 3]
    const sequence = [1, 2, 3]

    const result = match.call(iter, sequence)

    expect(spy).toBeCalledWith(iter, sequence)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
