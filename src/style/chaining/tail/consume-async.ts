import { applyBinding } from '@style/utils'
import { AsyncIterableOperatorBase } from '../async-iterable-operator-base'
import { consumeAsync as target } from '@tail/consume-async'

export class ConsumeAsyncOperator<T> extends AsyncIterableOperatorBase<T> {
  consumeAsync<U>(consumer: (iterable: AsyncIterable<T>) => PromiseLike<U>): Promise<U>
  consumeAsync(...args: unknown[]) {
    return applyBinding(this, target, args)
  }
}
