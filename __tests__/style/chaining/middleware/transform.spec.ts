import * as middleware from '@middleware/transform'
import { IterableOperator } from '@style/chaining'
import '@test/matchers'

describe('IterableOperator<T>::transform<U>(transformer: (iterable: Iterable<T>) => Iterable<U>): IterableOperator<U>', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'transform')
    const iter = [1, 2, 3]
    const transformer = () => iter

    const io = new IterableOperator(iter).transform(transformer)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, transformer)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
