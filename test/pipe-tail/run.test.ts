import { run } from '../../src'

test('run(iterable)', () => {
  const sideResult: number[] = []
  const sideEffect = function* () {
    for (const x of [1, 2, 3]) {
      sideResult.push(x)
      yield x
    }
  }
  const result = run(sideEffect())

  expect(result).toBeUndefined()
  expect(sideResult).toEqual([1, 2, 3])
})
