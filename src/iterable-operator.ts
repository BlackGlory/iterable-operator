import { range } from './pipe-head'
import { chunkBy, chunk, concat, each, filter, flatten, head, map, repeat, slice, tail, uniqBy, uniq, zip } from './pipe'
import { done, every, find, has, includes, reduce, run, some } from './pipe-tail'

type HeadlessTuple<T extends any[]> = ((...args: T) => any) extends (_: any, ...rest: infer R) => any ? R : []

type HeadlessParameters<T extends (...args: any[]) => any> = HeadlessTuple<Parameters<T>>

type FillAny<T> = {
  [K in keyof T]: any
}

export class IterableOperator<T> implements Iterable<T> {
  private subject: Iterable<T>

  constructor(iterable: Iterable<T>) {
    this.subject = iterable
  }

  [Symbol.iterator]() {
    return this.subject[Symbol.iterator]()
  }

  // pipe head

  static fromRange(end: number): IterableOperator<number>
  static fromRange(start: number, end: number): IterableOperator<number>
  static fromRange(start: number, end: number, unsignedStep: number): IterableOperator<number>
  static fromRange(...args: Partial<FillAny<Parameters<typeof range>>>) {
    return new IterableOperator(range(...args))
  }

  // pipe

  chunkBy(fn: (element: T, index: number) => boolean): IterableOperator<T[]>
  chunkBy(...args: Partial<FillAny<HeadlessParameters<typeof chunk>>>) {
    return new IterableOperator(chunkBy(this.subject, ...args))
  }

  chunk(length: number): IterableOperator<T[]>
  chunk(...args: Partial<FillAny<HeadlessParameters<typeof chunk>>>) {
    return new IterableOperator(chunk(this.subject, ...args))
  }

  concat(): never
  concat<T1>(iterable: Iterable<T1>): IterableOperator<T | T1>
  concat<T1, T2>(iterable1: Iterable<T1>, iterable2: Iterable<T2>): IterableOperator<T | T1 | T2>
  concat<T1, T2, T3>(iterable1: Iterable<T1>, iterable2: Iterable<T2>, iterable3: Iterable<T3>): IterableOperator<T | T1 | T2 | T3>
  concat<T1, T2, T3, T4>(iterable1: Iterable<T1>, iterable2: Iterable<T2>, iterable3: Iterable<T3>, iterable4: Iterable<T4>): IterableOperator<T | T1 | T2 | T3 | T4>
  concat<T1, T2, T3, T4, T5>(iterable1: Iterable<T1>, iterable2: Iterable<T2>, iterable3: Iterable<T3>, iterable4: Iterable<T4>, iterable5: Iterable<T5>): IterableOperator<T | T1 | T2 | T3 | T4 | T5>
  concat<T1, T2, T3, T4, T5, T6>(iterable1: Iterable<T1>, iterable2: Iterable<T2>, iterable3: Iterable<T3>, iterable4: Iterable<T4>, iterable5: Iterable<T5>, iterable6: Iterable<T6>): IterableOperator<T | T1 | T2 | T3 | T4 | T5 | T6>
  concat<T1, T2, T3, T4, T5, T6, T7>(iterable1: Iterable<T1>, iterable2: Iterable<T2>, iterable3: Iterable<T3>, iterable4: Iterable<T4>, iterable5: Iterable<T5>, iterable6: Iterable<T6>, iterable7: Iterable<T7>): IterableOperator<T | T1 | T2 | T3 | T4 | T5 | T6 | T7>
  concat<TResult>(...iterables: Iterable<unknown>[]): IterableOperator<TResult>
  concat(...args: Partial<FillAny<HeadlessParameters<typeof concat>>>) {
    return new IterableOperator(concat(this.subject, ...args))
  }

  each(fn: (element: T, index: number) => void): IterableOperator<T>
  each(...args: Partial<FillAny<HeadlessParameters<typeof each>>>) {
    return new IterableOperator(each(this.subject, ...args))
  }

  filter(fn: (element: T, index: number) => boolean): IterableOperator<T>
  filter(...args: Partial<FillAny<HeadlessParameters<typeof filter>>>) {
    return new IterableOperator(filter(this.subject, ...args))
  }

  flatten(): IterableOperator<T>
  flatten<U>(): IterableOperator<U>
  flatten(depth: number): IterableOperator<T>
  flatten<U>(depth: number): IterableOperator<U>
  flatten(...args: Partial<FillAny<HeadlessParameters<typeof flatten>>>) {
    return new IterableOperator(flatten(this.subject, ...args))
  }

  head(): Iterable<T>
  head(count: number): Iterable<T>
  head(...args: Partial<FillAny<HeadlessParameters<typeof head>>>) {
    return new IterableOperator(head(this.subject, ...args))
  }

  map<U>(fn: (element: T, index: number) => U): IterableOperator<U>
  map(...args: Partial<FillAny<HeadlessParameters<typeof map>>>) {
    return new IterableOperator(map(this.subject, ...args))
  }

  repeat(): IterableOperator<T>
  repeat(times: number): IterableOperator<T>
  repeat(...args: Partial<FillAny<HeadlessParameters<typeof repeat>>>) {
    return new IterableOperator(repeat(this.subject, ...args))
  }

  slice(): IterableOperator<T>
  slice(start: number): IterableOperator<T>
  slice(start: number, end: number): IterableOperator<T>
  slice(...args: Partial<FillAny<HeadlessParameters<typeof slice>>>) {
    return new IterableOperator(slice(this.subject, ...args))
  }

  tail(): IterableOperator<T>
  tail(count: number): IterableOperator<T>
  tail(...args: Partial<FillAny<HeadlessParameters<typeof tail>>>) {
    return new IterableOperator(tail(this.subject, ...args))
  }

  uniqBy<U>(fn: (element: T, index: number) => U): IterableOperator<T>
  uniqBy(...args: Partial<FillAny<HeadlessParameters<typeof uniqBy>>>) {
    return new IterableOperator(uniqBy(this.subject, ...args))
  }

  uniq(): IterableOperator<T>
  uniq(...args: Partial<FillAny<HeadlessParameters<typeof uniq>>>) {
    return new IterableOperator(uniq(this.subject, ...args))
  }

  zip(): IterableOperator<T[]>
  zip<T1>(iterable: Iterable<T1>): IterableOperator<Array<T | T1>>
  zip<T1, T2>(iterable1: Iterable<T1>, iterable2: Iterable<T2>): IterableOperator<Array<T1 | T2>>
  zip<T1, T2, T3>(iterable1: Iterable<T1>, iterable2: Iterable<T2>, iterable3: Iterable<T3>): IterableOperator<Array<T1 | T2 | T3>>
  zip<T1, T2, T3, T4>(iterable1: Iterable<T1>, iterable2: Iterable<T2>, iterable3: Iterable<T3>, iterable4: Iterable<T4>): IterableOperator<Array<T1 | T2 | T3 | T4>>
  zip<T1, T2, T3, T4, T5>(iterable1: Iterable<T1>, iterable2: Iterable<T2>, iterable3: Iterable<T3>, iterable4: Iterable<T4>, iterable5: Iterable<T5>): IterableOperator<Array<T1 | T2 | T3 | T4 | T5>>
  zip<T1, T2, T3, T4, T5, T6>(iterable1: Iterable<T1>, iterable2: Iterable<T2>, iterable3: Iterable<T3>, iterable4: Iterable<T4>, iterable5: Iterable<T5>, iterable6: Iterable<T6>): IterableOperator<Array<T1 | T2 | T3 | T4 | T5 | T6>>
  zip<T1, T2, T3, T4, T5, T6, T7>(iterable1: Iterable<T1>, iterable2: Iterable<T2>, iterable3: Iterable<T3>, iterable4: Iterable<T4>, iterable5: Iterable<T5>, iterable6: Iterable<T6>, iterable7: Iterable<T7>): IterableOperator<Array<T1 | T2 | T3 | T4 | T5 | T6 | T7>>
  zip<TResult>(...iterables: Iterable<unknown>[]): IterableOperator<TResult[]>
  zip(...args: Partial<FillAny<HeadlessParameters<typeof zip>>>) {
    return new IterableOperator(zip(this.subject, ...args))
  }

  // pipe tail

  done(): T[]
  done<U extends (iterable: Iterable<T>) => any>(factory: U): ReturnType<U>
  done(...args: Partial<FillAny<HeadlessParameters<typeof done>>>) {
    return done(this.subject, ...args)
  }

  every(fn: (element: T, index: number) => boolean): boolean
  every(...args: Partial<FillAny<HeadlessParameters<typeof every>>>) {
    return every(this.subject, ...args)
  }

  find(fn: (element: T, index: number) => boolean): T | undefined
  find(...args: Partial<FillAny<HeadlessParameters<typeof find>>>) {
    return find(this.subject, ...args)
  }

  has(value: T): boolean
  has(...args: Partial<FillAny<HeadlessParameters<typeof has>>>) {
    return has(this.subject, ...args)
  }

  includes(sequence: ArrayLike<T>): boolean
  includes(...args: Partial<FillAny<HeadlessParameters<typeof includes>>>) {
    return includes(this.subject, ...args)
  }

  reduce(fn: (previousValue: T | undefined, currentValue: T, currentIndex: number) => T): T
  reduce(fn: (previousValue: T, currentValue: T, currentIndex: number) => T, initialValue: T): T
  reduce<U>(fn: (previousValue: U, currentValue: T, currentIndex: number) => U, initialValue: U): U
  reduce(...args: Partial<FillAny<HeadlessParameters<typeof reduce>>>) {
    return reduce(this.subject, ...args)
  }

  run(): void
  run(fn: (element: T, index: number) => void): void
  run(...args: Partial<FillAny<HeadlessParameters<typeof run>>>) {
    return run(this.subject, ...args)
  }

  some(fn: (element: T, index: number) => boolean): boolean
  some(...args: Partial<FillAny<HeadlessParameters<typeof some>>>) {
    return some(this.subject, ...args)
  }
}
