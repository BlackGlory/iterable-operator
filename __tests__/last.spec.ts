import { last } from '@src/last.js'
import { MockIterable } from '@test/utils.js'
import { go } from '@blackglory/go'
import { pass } from '@blackglory/pass'

describe('last', () => {
  test('close the unexhausted iterator', () => {
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
    it('returns undefined', () => {
      const iter: number[] = []

      const result = last(iter)

      expect(result).toBeUndefined()
    })
  })

  describe('iterable isnt empty', () => {
    it('returns the last element in the iterable', () => {
      const iter = [1, 2, 3]

      const result = last(iter)

      expect(result).toBe(3)
    })
  })
})
