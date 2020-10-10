import * as middleware from '@middleware/drop-right'
import { dropRight } from '@style/binding/middleware/drop-right'
import '@blackglory/jest-matchers'

describe('dropRight<T>(this: Iterable<T>, count: number): Iterable<T>', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'dropRight')
    const iter = [1, 2, 3]
    const count = 1

    const result = dropRight.call(iter, count)

    expect(spy).toBeCalledWith(iter, count)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
