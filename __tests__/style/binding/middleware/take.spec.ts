import * as middleware from '@middleware/take'
import { take } from '@style/binding/middleware/take'
import '@blackglory/jest-matchers'

describe('take<T>(this: Iterable<T>, count: number): IterableIterator<T>', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'take')
    const iter = [1, 2, 3]
    const count = 1

    const result = take.call(iter, count)

    expect(spy).toBeCalledWith(iter, count)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
