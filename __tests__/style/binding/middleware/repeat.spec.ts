import * as middleware from '@middleware/repeat'
import { repeat } from '@style/binding/middleware/repeat'
import '@blackglory/jest-matchers'

describe('repeat<T>(this: Iterable<T>, times: number): Iterable<T>', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'repeat')
    const iter = [1, 2, 3]
    const times = 1

    const result = repeat.call(iter, times)

    expect(spy).toBeCalledWith(iter, times)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
