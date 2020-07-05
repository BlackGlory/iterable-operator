import { toIterable, toAsyncIterable, toFunction, toAsyncFunction } from './utils'

type AnyFunction = (...args: any[]) => any

type ToAwaitable<T> = (iterable: Iterable<T>) => Iterable<T> | AsyncIterable<T>

export function testIterable(signature: string): [string, ToAwaitable<any>] {
  return [signature, toIterable]
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
