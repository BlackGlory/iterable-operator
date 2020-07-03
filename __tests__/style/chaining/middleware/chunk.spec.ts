import * as middleware from '@middleware/chunk'
import { IterableOperator } from '@style/chaining'
import '@test/matchers'

describe('IterableOperator<T>::chunk(size: number): IterableOperator<T[]>', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'chunk')
    const iter = [1, 2, 3]
    const size = 1

    const io = new IterableOperator(iter).chunk(size)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, size)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
