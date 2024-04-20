import { describe, test, expect } from 'vitest'
import { prefetch } from '@src/prefetch.js'
import { MockIterable } from '@test/utils.js'
import { toArrayAsync } from '@src/to-array-async.js'
import { delay } from 'extra-promise'

describe('prefetch', () => {
  test('size > count(iter)', async () => {
    const iter = new MockIterable([0, 1, 2])

    const iterator = prefetch(iter, 5)
    await delay(0)
    const done = iter.done
    const result = await toArrayAsync(iterator)

    expect(done).toBe(true)
    expect(result).toStrictEqual([0, 1, 2])
  })

  test('size = count(iter)', async () => {
    const iter = new MockIterable([0, 1, 2])

    const iterator = prefetch(iter, 3)
    await delay(0) // [0, 1, 2]
    await iterator.next() // 0, [1, 2]
    await delay(0) // [1, 2]
    const done = iter.done
    const result = await toArrayAsync(iterator)

    expect(done).toBe(true)
    expect(result).toStrictEqual([1, 2])
  })

  test('size < count(iter)', async () => {
    const iter = new MockIterable([0, 1, 2, 3, 4])

    const iterator = prefetch(iter, 3)
    await delay(0) // [0, 1, 2]
    const nextIndex1 = iter.nextIndex // 3
    await iterator.next() // 0, [1, 2]
    await delay(0) // [1, 2, 3]
    const nextIndex2 = iter.nextIndex // 4
    const result = await toArrayAsync(iterator)

    expect(nextIndex1).toBe(3)
    expect(nextIndex2).toBe(4)
    expect(result).toStrictEqual([1, 2, 3, 4])
  })
})
