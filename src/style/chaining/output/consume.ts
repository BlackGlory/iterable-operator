import { applyBinding } from '@style/utils'
import { consume as target } from '@output/consume'
import { Subject } from '../subject'

export class ConsumeOperator<
  T
, U extends Iterable<T> | AsyncIterable<T>
> extends Subject<U> {
  consume<T>(consumer: (iterable: U) => T): T
  consume(...args: unknown[]) {
    return applyBinding(this.subject, target, args)
  }
}
