import * as middleware from '@middleware/chunk-by'
import { IterableOperator } from '@style/chaining'
import '@test/matchers'

describe('IterableOperator<T>::chunkBy(fn: (element: T, index: number) => boolean): IterableOperator<T[]>', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'chunkBy')
    const iter = [1, 2, 3]
    const fn = () => true

    const io = new IterableOperator(iter).chunkBy(fn)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})