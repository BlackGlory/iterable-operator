import { isAsyncIterable, isntAsyncIterable } from '@utils/is-async-iterable'
import { toIterable, toAsyncIterable } from '@test/utils'

describe('isAsyncIterable', () => {
  test('is AsyncIterable', () => {
    const value = toAsyncIterable([])

    const result = isAsyncIterable(value)

    expect(result).toBe(true)
  })

  test('isnt AsyncIterable', () => {
    const value = toIterable([])

    const result = isAsyncIterable(value)

    expect(result).toBe(false)
  })
})

describe('isntAsyncIterable', () => {
  test('is AsyncIterable', () => {
    const value = toAsyncIterable([])

    const result = isntAsyncIterable(value)

    expect(result).toBe(false)
  })

  test('isnt AsyncIterable', () => {
    const value = toIterable([])

    const result = isntAsyncIterable(value)

    expect(result).toBe(true)
  })
})
