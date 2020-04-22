import { applyBinding } from '@style/utils'
import { consume as target } from '@tail/consume'
import { Subject } from '../subject'

export class ConsumeOperator<T, U extends Iterable<T> | AsyncIterable<T>> extends Subject<U> {
  consume<V>(consumer: (iterable: U) => U): V
  consume<V>(consumer: (iterable: U) => U): V
  consume(...args: unknown[]) {
    return applyBinding(this, target, args)
  }
}
