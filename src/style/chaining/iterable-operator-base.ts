import { Subject } from './subject'

export class IterableOperatorBase<T> extends Subject<Iterable<T>> implements Iterable<T> {
  [Symbol.iterator]() {
    return this.subject[Symbol.iterator]()
  }
}
