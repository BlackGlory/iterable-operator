import * as middleware from '@middleware/to-async-iterable'
import { IterableOperator } from '@style/chaining'

describe(`
  IterableOperator<T>::toAsyncIterable<T>(
    iterable: Iterable<Awaitable<T>>
  ): AsyncIterableOperator<T>
`, () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'toAsyncIterable')
    const iter = [1, 2, 3]

    const io = new IterableOperator(iter).toAsyncIterable()
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
