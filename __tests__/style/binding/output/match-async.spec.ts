import * as output from '@output/match-async'
import { matchAsync } from '@style/binding/output/match-async'
import { toAsyncIterable } from '@test/utils'

describe('matchAsync<T>(this: AsyncIterable<T>, sequence: ArrayLike<T>): Promise<boolean>', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(output, 'matchAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const sequence = [1, 2, 3]

    const result = matchAsync.call(iter, sequence)

    expect(spy).toBeCalledWith(iter, sequence)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
