import * as Head from '@input/index'

test('Head', () => {
  const expectedExports: string[] = [
    'of'
  , 'countdown'
  , 'countup'
  , 'range'

  , 'InvalidArgumentError'
  ].sort()

  const actualExports = Object.keys(Head).sort()

  expect(actualExports).toEqual(expectedExports)
})
