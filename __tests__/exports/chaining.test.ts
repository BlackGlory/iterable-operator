import * as Chain from '@style/chaining'

test('Chain', () => {
  const expectedExports: string[] = [
    'IterableOperator'
  , 'AsyncIterableOperator'
  ].sort()

  const actualExports = Object.keys(Chain).sort()

  expect(actualExports).toEqual(expectedExports)
})
