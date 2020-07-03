import * as output from '@output/match'
import { match } from '@style/pipeline/output/match'

describe('match<T>(sequence: ArrayLike<T>): (iterable: Iterable<T>) => boolean', () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(output, 'match')
    const iter = [1, 2, 3]
    const sequence = [1, 2, 3]

    const result = match(sequence)(iter)

    expect(spy).toBeCalledWith(iter, sequence)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
