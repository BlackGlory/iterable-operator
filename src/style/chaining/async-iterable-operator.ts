import { mixinDecorators } from './mixin'
import { AsyncIterableOperatorBase } from './async-iterable-operator-base'

import { ChunkAsyncOperator } from './body/chunk-async'
import { ChunkByAsyncOperator } from './body/chunk-by-async'
import { ConcatAsyncOperator } from './body/concat-async'
import { DropAsyncOperator } from './body/drop-async'
import { DropRightAsyncOperator } from './body/drop-right-async'
import { DropUntilAsyncOperator } from './body/drop-until-async'
import { FilterAsyncOperator } from './body/filter-async'
import { FlattenAsyncOperator } from './body/flatten-async'
import { FlattenByAsync } from './body/flatten-by-async'
import { FlattenDeepAsyncOperator } from './body/flatten-deep-async'
import { MapAsyncOperator } from './body/map-async'
import { RepeatAsyncOperator } from './body/repeat-async'
import { SliceAsyncOperator } from './body/slice-async'
import { SplitAsyncOperator } from './body/split-async'
import { SplitByAsyncOperator } from './body/split-by-async'
import { TakeAsyncOperator } from './body/take-async'
import { TakeRightAsyncOperator } from './body/take-right-async'
import { TakeUntilAsyncOperator } from './body/take-until-async'
import { TapAsyncOperator } from './body/tap-async'
import { UniqAsyncOperator } from './body/uniq-async'
import { UniqByAsyncOperator } from './body/uniq-by-async'
import { ZipAsyncOperator } from './body/zip-async'

import { ConsumeAsyncOperator } from './tail/consume-async'
import { EachAsyncOperator } from './tail/each-async'
import { EveryAsyncOperator } from './tail/every-async'
import { FindAsyncOperator } from './tail/find-async'
import { FirstAsyncOperator } from './tail/first-async'
import { IncludesAsyncOperator } from './tail/includes-async'
import { MatchAsyncOperator } from './tail/match-async'
import { ReduceAsyncOperator } from './tail/reduce-async'
import { SomeAsyncOperator } from './tail/some-async'
import { LastAsyncOperator } from './tail/last-async'
import { ToArrayAsyncOperator } from './tail/to-array-async'
import { ToSetAsyncOperator } from './tail/to-set-async'

export {
  InvalidArgumentError
, InvalidArgumentsLengthError
, RuntimeError
} from '@src/error'

export class AsyncIterableOperator<T> extends AsyncIterableOperatorBase<T> {}

export interface AsyncIterableOperator<T> extends
  ChunkAsyncOperator<T>
, ChunkByAsyncOperator<T, AsyncIterable<T>>
, ConcatAsyncOperator<T, AsyncIterable<T>>
, DropAsyncOperator<T>
, DropRightAsyncOperator<T>
, DropUntilAsyncOperator<T, AsyncIterable<T>>
, FilterAsyncOperator<T, AsyncIterable<T>>
, FlattenAsyncOperator<T>
, FlattenByAsync<T, AsyncIterable<T>>
, FlattenDeepAsyncOperator<T>
, MapAsyncOperator<T, AsyncIterable<T>>
, RepeatAsyncOperator<T>
, SliceAsyncOperator<T>
, SplitAsyncOperator<T>
, SplitByAsyncOperator<T, AsyncIterable<T>>
, TakeAsyncOperator<T>
, TakeRightAsyncOperator<T>
, TakeUntilAsyncOperator<T, AsyncIterable<T>>
, TapAsyncOperator<T, AsyncIterable<T>>
, UniqAsyncOperator<T>
, UniqByAsyncOperator<T, AsyncIterable<T>>
, ZipAsyncOperator<T, AsyncIterable<T>>

, ConsumeAsyncOperator<T>
, EachAsyncOperator<T, AsyncIterable<T>>
, EveryAsyncOperator<T, AsyncIterable<T>>
, FindAsyncOperator<T, AsyncIterable<T>>
, FirstAsyncOperator<T>
, IncludesAsyncOperator<T>
, MatchAsyncOperator<T>
, ReduceAsyncOperator<T, AsyncIterable<T>>
, SomeAsyncOperator<T, AsyncIterable<T>>
, LastAsyncOperator<T>
, ToArrayAsyncOperator<T>
, ToSetAsyncOperator<T>
{}

mixinDecorators(AsyncIterableOperator, [
  ChunkAsyncOperator
, ChunkByAsyncOperator
, ConcatAsyncOperator
, DropAsyncOperator
, DropRightAsyncOperator
, DropUntilAsyncOperator
, FilterAsyncOperator
, FlattenAsyncOperator
, FlattenByAsync
, FlattenDeepAsyncOperator
, MapAsyncOperator
, RepeatAsyncOperator
, SliceAsyncOperator
, SplitAsyncOperator
, SplitByAsyncOperator
, TakeAsyncOperator
, TakeRightAsyncOperator
, TakeUntilAsyncOperator
, TapAsyncOperator
, UniqAsyncOperator
, UniqByAsyncOperator
, ZipAsyncOperator

, ConsumeAsyncOperator
, EachAsyncOperator
, EveryAsyncOperator
, FindAsyncOperator
, FirstAsyncOperator
, IncludesAsyncOperator
, MatchAsyncOperator
, ReduceAsyncOperator
, SomeAsyncOperator
, LastAsyncOperator
, ToArrayAsyncOperator
, ToSetAsyncOperator
])
