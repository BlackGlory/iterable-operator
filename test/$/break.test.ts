import { $break, BreakFlag } from '../../src'

test('$break()', done => {
  try {
    $break()
  } catch (e) {
    expect(e).toBe(BreakFlag)
    done()
  }
})
