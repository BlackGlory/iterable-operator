import { mixinDecorators } from './mixin'
import { AsyncIterableOperatorBase } from './async-iterable-operator-base'

import { ChunkAsyncOperator } from './middleware/chunk-async'
import { ChunkByAsyncOperator } from './middleware/chunk-by-async'
import { ConcatAsyncOperator } from './middleware/concat-async'
import { DropAsyncOperator } from './middleware/drop-async'
import { DropRightAsyncOperator } from './middleware/drop-right-async'
import { DropUntilAsyncOperator } from './middleware/drop-until-async'
import { FilterAsyncOperator } from './middleware/filter-async'
import { FlattenAsyncOperator } from './middleware/flatten-async'
import { FlattenByAsync } from './middleware/flatten-by-async'
import { FlattenDeepAsyncOperator } from './middleware/flatten-deep-async'
import { MapAsyncOperator } from './middleware/map-async'
import { RepeatAsyncOperator } from './middleware/repeat-async'
import { SliceAsyncOperator } from './middleware/slice-async'
import { SplitAsyncOperator } from './middleware/split-async'
import { SplitByAsyncOperator } from './middleware/split-by-async'
import { TakeAsyncOperator } from './middleware/take-async'
import { TakeRightAsyncOperator } from './middleware/take-right-async'
import { TakeUntilAsyncOperator } from './middleware/take-until-async'
import { TapAsyncOperator } from './middleware/tap-async'
import { TransformAsyncOperator } from './middleware/transform-async'
import { UniqAsyncOperator } from './middleware/uniq-async'
import { UniqByAsyncOperator } from './middleware/uniq-by-async'
import { ZipAsyncOperator } from './middleware/zip-async'

import { ConsumeOperator } from './output/consume'
import { EachAsyncOperator } from './output/each-async'
import { EveryAsyncOperator } from './output/every-async'
import { FindAsyncOperator } from './output/find-async'
import { FirstAsyncOperator } from './output/first-async'
import { IncludesAsyncOperator } from './output/includes-async'
import { MatchAsyncOperator } from './output/match-async'
import { ReduceAsyncOperator } from './output/reduce-async'
import { SomeAsyncOperator } from './output/some-async'
import { LastAsyncOperator } from './output/last-async'
import { ToArrayAsyncOperator } from './output/to-array-async'
import { ToSetAsyncOperator } from './output/to-set-async'

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
, TransformAsyncOperator<T, AsyncIterable<T>>
, UniqAsyncOperator<T>
, UniqByAsyncOperator<T, AsyncIterable<T>>
, ZipAsyncOperator<T, AsyncIterable<T>>

, ConsumeOperator<T, AsyncIterable<T>>
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
, TransformAsyncOperator
, UniqAsyncOperator
, UniqByAsyncOperator
, ZipAsyncOperator

, ConsumeOperator
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
