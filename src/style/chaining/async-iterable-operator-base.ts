import { Subject } from './subject'

export class AsyncIterableOperatorBase<T> extends Subject<AsyncIterable<T>> implements AsyncIterable<T> {
  [Symbol.asyncIterator]() {
    return this.subject[Symbol.asyncIterator]()
  }
}
