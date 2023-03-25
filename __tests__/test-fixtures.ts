import {
  toIterablePromises
, toIterable
, toAsyncIterable
, toFunction
, toAsyncFunction
} from './utils.js'

type AnyFunction = (...args: any[]) => any

export function testIterable(signature: string): [
  string
, (iterable: Iterable<any>) => Iterable<any> | AsyncIterable<any>
] {
  return [signature, toIterable]
}

export function testIterablePromises(signature: string): [
  string
, (iterable: Iterable<any>) => Iterable<any> | AsyncIterable<any>
] {
  return [signature, toIterablePromises]
}

export function testAsyncIterable(signature: string): [
  string
, (iterable: Iterable<any>) => Iterable<any> | AsyncIterable<any>
] {
  return [signature, toAsyncIterable]
}

export function testFunction(name: string): [string, AnyFunction] {
  return [name, toFunction]
}

export function testAsyncFunction(name: string): [string, AnyFunction] {
  return [name, toAsyncFunction]
}
