import * as output from '@output/every-async'
import { everyAsync } from '@style/binding/output/every-async'

describe('everyAsync<T>(this: Iterable<T> | AsyncIterable<T>, predicate: (element: T, index: number) => unknown | PromiseLike<unknown>): Promise<boolean>', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(output, 'everyAsync')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = everyAsync.call(iter, fn)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
