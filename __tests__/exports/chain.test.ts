import * as Chain from '@style/chaining'

test('Chain', () => {
  const expectedExports: string[] = [
    'IterableOperator'
  , 'AsyncIterableOperator'

  , 'InvalidArgumentError'
  , 'InvalidArgumentsLengthError'
  , 'RuntimeError'
  ].sort()

  const actualExports = Object.keys(Chain).sort()

  expect(actualExports).toEqual(expectedExports)
})
