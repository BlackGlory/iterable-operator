import { toIterable, toAsyncIterable, toFunction, toAsyncFunction } from './utils'
import { pipe, bind, iterableChain, iterableChainAsync, asyncIterableChain, method, asyncMethod } from './style-helpers'

type AnyFunction = (...args: any[]) => any

type ToAwaitable<T> = (iterable: Iterable<T>) => Iterable<T> | AsyncIterable<T>

export function testCall(signature: string, target: AnyFunction): [string, AnyFunction] {
  return [signature, target]
}

export function testPipe(signature: string, target: AnyFunction): [string, AnyFunction] {
  return [signature, pipe(target)]
}

export function testBind(signature: string, target: AnyFunction): [string, AnyFunction] {
  return [signature , bind(target)]
}

export function testIterableChain(signature: string, target: AnyFunction): [string, AnyFunction] {
  return [signature, iterableChain(target)]
}

export function testIterableChainAsync(signature: string, target: AnyFunction): [string, AnyFunction] {
  return [signature, iterableChainAsync(target) ]
}

export function testAsyncIterableChain(signature: string, target: AnyFunction): [string, AnyFunction] {
  return [signature, asyncIterableChain(target)]
}

export function testMethod(signature: string, target: AnyFunction): [string, AnyFunction] {
  return [signature, method(target)]
}

export function testAsyncMethod(signature: string, target: AnyFunction): [string, AnyFunction] {
  return [signature, asyncMethod(target)]
}

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
