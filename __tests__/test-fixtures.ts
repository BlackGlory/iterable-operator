import {
  toIterablePromises
, toIterable
, toAsyncIterable
, toFunction
, toAsyncFunction
} from './utils.js'

type AnyFunction = (...args: any[]) => any

type ToAwaitable<T> = (iterable: Iterable<T>) => Iterable<T> | AsyncIterable<T>

export function testIterable(signature: string): [string, ToAwaitable<any>] {
  return [signature, toIterable]
}

export function testIterablePromises(signature: string): [string, ToAwaitable<any>] {
  return [signature, toIterablePromises]
}

export function testAsyncIterable(signature: string): [string, ToAwaitable<any>] {
  return [signature, toAsyncIterable]
}

export function testFunction(name: string): [string, AnyFunction] {
  return [name, toFunction]
}

export function testAsyncFunction(name: string): [string, AnyFunction] {
  return [name, toAsyncFunction]
}
