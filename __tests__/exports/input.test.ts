import * as Head from '@input/index'

test('Head', () => {
  const expectedExports: string[] = [
    'countdown'
  , 'countup'
  , 'range'

  , 'InvalidArgumentError'
  ].sort()

  const actualExports = Object.keys(Head).sort()

  expect(actualExports).toEqual(expectedExports)
})
