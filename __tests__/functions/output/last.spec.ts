import { last } from '@output/last'
import { MockIterable } from '@test/utils'
import { go } from '@blackglory/go'
import { pass } from '@blackglory/pass'

describe('last<T>(iterable: Iterable<T>): T | undefined', () => {
  test('close unexhausted iterator', () => {
    const iter = new MockIterable(go(function* () {
      throw new Error()
    }))

    try {
      last(iter)
    } catch {
      pass()
    }

    expect(iter.returnCalled).toBeTruthy()
    expect(iter.done).toBeTruthy()
  })

  describe('iterable is empty', () => {
    it('return undefined', () => {
      const iter: number[] = []

      const result = last(iter)

      expect(result).toBeUndefined()
    })
  })

  describe('iterable isnt empty', () => {
    it('return the last element in the iterable', () => {
      const iter = [1, 2, 3]

      const result = last(iter)

      expect(result).toBe(3)
    })
  })
})
