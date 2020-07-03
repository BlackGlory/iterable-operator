import * as middleware from '@middleware/repeat'
import { repeat } from '@style/pipeline/middleware/repeat'
import '@test/matchers'

describe('repeat<T>(times: number): (iterable: Iterable<T>) => Iterable<T>', () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'repeat')
    const iter = [1, 2, 3]
    const times = 1

    const result = repeat(times)(iter)

    expect(spy).toBeCalledWith(iter, times)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
