import * as output from '@output/match-async'
import { matchAsync } from '@style/pipeline/output/match-async'
import { toAsyncIterable } from '@test/utils'

describe('matchAsync<T>(sequence: ArrayLike<T>): (iterable: AsyncIterable<T>) => Promise<boolean>', () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(output, 'matchAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const sequence = [1, 2, 3]

    const result = matchAsync(sequence)(iter)

    expect(spy).toBeCalledWith(iter, sequence)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
