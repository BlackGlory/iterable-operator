import * as output from '@output/consume'
import { consume } from '@style/pipeline/output/consume'

describe('consume<T, U>(consumer: (iterable: Iterable<T>) => U): (iterable: Iterable<T>) => U', () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(output, 'consume')
    const iter = [1, 2, 3]
    const consumer = () => true

    const result = consume(consumer)(iter)

    expect(spy).toBeCalledWith(iter, consumer)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
