import * as output from '@output/count-async'
import { countAsync } from '@style/binding/output/count-async'
import { toAsyncIterable } from '@test/utils'

describe('countAsync(this: AsyncIterable<unknown>): Promise<number>', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(output, 'countAsync')
    const iter = toAsyncIterable([1, 2, 3])

    const result = countAsync.call(iter)

    expect(spy).toBeCalledWith(iter)
    expect(spy).toReturnWith(result)
  })
})
