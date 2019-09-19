import { $continue, ContinueFlag } from '../../src'

test('$continue()', done => {
  try {
    $continue()
  } catch (e) {
    expect(e).toBe(ContinueFlag)
    done()
  }
})
