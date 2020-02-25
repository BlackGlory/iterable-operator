// The purpose of all these test cases is to make sure IterableOperator will pass arguments to right functions.

import { IterableOperator } from '../src'
import { range } from '../src/pipe-head'
import { chunkBy, chunk, concat, filter, flatten, flattenDeep, head, map, repeat, slice, tail, tap, uniqBy, uniq, zip } from '../src/pipe'
import { consume, done, each, every, find, has, includes, reduce, some, toArray, toSet } from '../src/pipe-tail'

// pipe head

test('IterableOperator.fromRange(end)', () => {
  const instance = IterableOperator.fromRange(10)
  const result = range(10)

  expect(instance).toBeInstanceOf(IterableOperator)
  expect([...instance]).toEqual([...result])
})

// pipe

test('IterableOperator(iterable).chunkBy(fn)', () => {
  const instance = new IterableOperator('123').chunkBy(x => x === '1')
  const result = chunkBy('123', x => x === '1')

  expect(instance).toBeInstanceOf(IterableOperator)
  expect([...instance]).toEqual([...result])
})

test('IterableOperator(iterable).chunk(length)', () => {
  const instance = new IterableOperator('123').chunk(2)
  const result = chunk('123', 2)

  expect(instance).toBeInstanceOf(IterableOperator)
  expect([...instance]).toEqual([...result])
})

test('IterableOperator(iterable).concat(iterable)', () => {
  const instance = new IterableOperator('123').concat('456')
  const result = concat('123', '456')

  expect(instance).toBeInstanceOf(IterableOperator)
  expect([...instance]).toEqual([...result])
})

test('IterableOperator(iterable).filter(fn)', () => {
  const instance = new IterableOperator('123').filter(x => parseInt(x, 10) % 2 === 0)
  const result = filter('123', x => parseInt(x, 10) % 2 === 0)

  expect(instance).toBeInstanceOf(IterableOperator)
  expect([...instance]).toEqual([...result])
})

test('IterableOperator(iterable).flatten()', () => {
  const instance = new IterableOperator([1, [2, [3]]]).flatten()
  const result = flatten([1, [2, [3]]])

  expect(instance).toBeInstanceOf(IterableOperator)
  expect([...instance]).toEqual([...result])
})

test('IterableOperator(iterable).flattenDeep()', () => {
  const instance = new IterableOperator([1, [2, [3]]]).flattenDeep()
  const result = flattenDeep([1, [2, [3]]])

  expect(instance).toBeInstanceOf(IterableOperator)
  expect([...instance]).toEqual([...result])
})

test('IterableOperator(iterable).head(count)', () => {
  const instance = new IterableOperator('123').head(2)
  const result = head('123', 2)

  expect(instance).toBeInstanceOf(IterableOperator)
  expect([...instance]).toEqual([...result])
})

test('IterableOperator(iterable).map(fn)', () => {
  const instance = new IterableOperator('123').map(x => parseInt(x, 10))
  const result = map('123', x => parseInt(x, 10))

  expect(instance).toBeInstanceOf(IterableOperator)
  expect([...instance]).toEqual([...result])
})

test('IterableOperator(iterable).repeat(times)', () => {
  const instance = new IterableOperator('123').repeat(2)
  const result = repeat('123', 2)

  expect(instance).toBeInstanceOf(IterableOperator)
  expect([...instance]).toEqual([...result])
})

test('IterableOperator(iterable).slice(start)', () => {
  const instance = new IterableOperator('123').slice(1)
  const result = slice('123', 1)

  expect(instance).toBeInstanceOf(IterableOperator)
  expect([...instance]).toEqual([...result])
})

test('IterableOperator(iterable).tail(count)', () => {
  const instance = new IterableOperator('123').tail(2)
  const result = tail('123', 2)

  expect(instance).toBeInstanceOf(IterableOperator)
  expect([...instance]).toEqual([...result])
})

test('IterableOperator(iterable).tap(fn)', () => {
  const instance = new IterableOperator('123').tap(x => parseInt(x, 10))
  const result = tap('123', x => parseInt(x, 10))

  expect(instance).toBeInstanceOf(IterableOperator)
  expect([...instance]).toEqual([...result])
})

test('IterableOperator(iterable).uniqBy(fn)', () => {
  const instance = new IterableOperator([1, 2, 3]).uniqBy(x => x % 2)
  const result = uniqBy([1, 2, 3], x => x % 2)

  expect(instance).toBeInstanceOf(IterableOperator)
  expect([...instance]).toEqual([...result])
})

test('IterableOperator(iterable).uniq()', () => {
  const instance = new IterableOperator('123123').uniq()
  const result = uniq('123123')

  expect(instance).toBeInstanceOf(IterableOperator)
  expect([...instance]).toEqual([...result])
})

test('IterableOperator(iterable).zip(iterable)', () => {
  const instance = new IterableOperator('123').zip([1, 2, 3])
  const result = zip('123', [1, 2, 3])

  expect(instance).toBeInstanceOf(IterableOperator)
  expect([...instance]).toEqual([...result])
})

// pipe tail

test('IterableOperator(iterable).consume(consumer)', () => {
  const instanceResult = new IterableOperator('123').consume(x => [...x])
  const result = consume('123', x => [...x])

  expect(instanceResult).toEqual(result)
})

test('IterableOperator(iterable).done()', () => {
  const instanceResult = new IterableOperator('123').done()
  const result = done('123')

  expect(instanceResult).toEqual(result)
})

test('IterableOperator(iterable).each(fn)', () => {
  const instanceResult = new IterableOperator('123').each(x => parseInt(x, 10))
  const result = each('123', x => parseInt(x, 10))

  expect(instanceResult).toEqual(result)
})

test('IterableOperator(iterable).every(fn)', () => {
  const instanceResult = new IterableOperator('123').every(x => typeof x === 'string')
  const result = every('123', x => typeof x === 'string')

  expect(instanceResult).toEqual(result)
})

test('IterableOperator(iterable).find(fn)', () => {
  const instanceResult = new IterableOperator('123').find(x => x === '2')
  const result = find('123', x => x === '2')

  expect(instanceResult).toEqual(result)
})

test('IterableOperator(iterable).has(value)', () => {
  const instanceResult = new IterableOperator('123').has('2')
  const result = has('123', '2')

  expect(instanceResult).toEqual(result)
})

test('IterableOperator(iterable).includes(sequence)', () => {
  const instanceResult = new IterableOperator('123').includes('23')
  const result = includes('123', '23')

  expect(instanceResult).toEqual(result)
})

test('IterableOperator(iterable).reduce(fn)', () => {
  const instanceResult = new IterableOperator('123').reduce((ret, cur) => `${ret},${cur}`)
  const result = reduce('123', (ret, cur) => `${ret},${cur}`)

  expect(instanceResult).toEqual(result)
})

test('IterableOperator(iterable).some(fn)', () => {
  const instanceResult = new IterableOperator('123').some(x => x === '2')
  const result = some('123', x => x === '2')

  expect(instanceResult).toEqual(result)
})

test('IterableOperator(iterable).toArray()', () => {
  const instanceResult = new IterableOperator('123').toArray()
  const result = toArray('123')

  expect(instanceResult).toEqual(result)
})

test('IterableOperator(iterable).toSet()', () => {
  const instanceResult = new IterableOperator('123').toSet()
  const result = toSet('123')

  expect(instanceResult).toEqual(result)
})
