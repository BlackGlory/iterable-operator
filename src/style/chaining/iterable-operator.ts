import { mixinDecorators } from './mixin'
import { IterableOperatorBase } from './iterable-operator-base'

import { ChunkByOperator } from './body/chunk-by'
import { ChunkOperator } from './body/chunk'
import { ConcatOperator } from './body/concat'
import { DropRightOperator } from './body/drop-right'
import { DropUntilOperator } from './body/drop-until'
import { DropOperator } from './body/drop'
import { FilterOperator } from './body/filter'
import { FlattenByOperator } from './body/flatten-by'
import { FlattenDeepOperator } from './body/flatten-deep'
import { FlattenOperator } from './body/flatten'
import { MapOperator } from './body/map'
import { RepeatOperator } from './body/repeat'
import { SliceOperator } from './body/slice'
import { SplitByOperator } from './body/split-by'
import { SplitOperator } from './body/split'
import { TakeRightOperator } from './body/take-right'
import { TakeUntilOperator } from './body/take-until'
import { TakeOperator } from './body/take'
import { TapOperator } from './body/tap'
import { ToAsyncIterableOperator } from './body/to-async-iterable'
import { TransformAsyncOperator } from './body/transform-async'
import { TransformOperator } from './body/transform'
import { UniqByOperator } from './body/uniq-by'
import { UniqOperator } from './body/uniq'
import { ZipOperator } from './body/zip'

import { ChunkByAsyncOperator } from './body/chunk-by-async'
import { ConcatAsyncOperator } from './body/concat-async'
import { DropUntilAsyncOperator } from './body/drop-until-async'
import { FilterAsyncOperator } from './body/filter-async'
import { FlattenByAsync } from './body/flatten-by-async'
import { MapAsyncOperator } from './body/map-async'
import { SplitByAsyncOperator } from './body/split-by-async'
import { TakeUntilAsyncOperator } from './body/take-until-async'
import { TapAsyncOperator } from './body/tap-async'
import { UniqByAsyncOperator } from './body/uniq-by-async'
import { ZipAsyncOperator } from './body/zip-async'

import { ConsumeOperator } from './tail/consume'
import { EachOperator } from './tail/each'
import { EveryOperator } from './tail/every'
import { FindOperator } from './tail/find'
import { FirstOperator } from './tail/first'
import { IncludesOperator } from './tail/includes'
import { MatchOperator } from './tail/match'
import { ReduceOperator } from './tail/reduce'
import { SomeOperator } from './tail/some'
import { LastOperator } from './tail/last'
import { ToArrayOperator } from './tail/to-array'
import { ToSetOperator } from './tail/to-set'

import { EachAsyncOperator } from './tail/each-async'
import { EveryAsyncOperator } from './tail/every-async'
import { FindAsyncOperator } from './tail/find-async'
import { ReduceAsyncOperator } from './tail/reduce-async'
import { SomeAsyncOperator } from './tail/some-async'

export {
  InvalidArgumentError
, InvalidArgumentsLengthError
, RuntimeError
} from '@src/error'

export class IterableOperator<T> extends IterableOperatorBase<T> {}

export interface IterableOperator<T> extends
  ChunkOperator<T>
, ChunkByOperator<T>
, ConcatOperator<T>
, DropRightOperator<T>
, DropUntilOperator<T>
, DropOperator<T>
, FilterOperator<T>
, FlattenByOperator<T>
, FlattenDeepOperator<T>
, FlattenOperator<T>
, MapOperator<T>
, RepeatOperator<T>
, SliceOperator<T>
, SplitByOperator<T>
, SplitOperator<T>
, TakeRightOperator<T>
, TakeUntilOperator<T>
, TakeOperator<T>
, TapOperator<T>
, TransformOperator<T>
, UniqByOperator<T>
, UniqOperator<T>
, ZipOperator<T>

, ChunkByAsyncOperator<T, Iterable<T>>
, ConcatAsyncOperator<T, Iterable<T>>
, DropUntilAsyncOperator<T, Iterable<T>>
, FilterAsyncOperator<T, Iterable<T>>
, FlattenByAsync<T, Iterable<T>>
, MapAsyncOperator<T, Iterable<T>>
, SplitByAsyncOperator<T, Iterable<T>>
, TakeUntilAsyncOperator<T, Iterable<T>>
, TapAsyncOperator<T, Iterable<T>>
, ToAsyncIterableOperator<T>
, TransformAsyncOperator<T, Iterable<T>>
, UniqByAsyncOperator<T, Iterable<T>>
, ZipAsyncOperator<T, Iterable<T>>

, ConsumeOperator<T, Iterable<T>>
, EachOperator<T>
, EveryOperator<T>
, FindOperator<T>
, FirstOperator<T>
, IncludesOperator<T>
, MatchOperator<T>
, ReduceOperator<T>
, SomeOperator<T>
, LastOperator<T>
, ToArrayOperator<T>
, ToSetOperator<T>

, EachAsyncOperator<T, Iterable<T>>
, EveryAsyncOperator<T, Iterable<T>>
, FindAsyncOperator<T, Iterable<T>>
, ReduceAsyncOperator<T, Iterable<T>>
, SomeAsyncOperator<T, Iterable<T>>
{}

mixinDecorators(IterableOperator, [
  ChunkOperator
, ChunkByOperator
, ConcatOperator
, DropRightOperator
, DropUntilOperator
, DropOperator
, FilterOperator
, FlattenByOperator
, FlattenDeepOperator
, FlattenOperator
, MapOperator
, RepeatOperator
, SliceOperator
, SplitByOperator
, SplitOperator
, TakeRightOperator
, TakeUntilOperator
, TakeOperator
, TapOperator
, TransformOperator
, UniqByOperator
, UniqOperator
, ZipOperator

, ChunkByAsyncOperator
, ConcatAsyncOperator
, DropUntilAsyncOperator
, FilterAsyncOperator
, FlattenByAsync
, MapAsyncOperator
, SplitByAsyncOperator
, TakeUntilAsyncOperator
, TapAsyncOperator
, ToAsyncIterableOperator
, TransformAsyncOperator
, UniqByAsyncOperator
, ZipAsyncOperator

, ConsumeOperator
, EachOperator
, EveryOperator
, FindOperator
, FirstOperator
, IncludesOperator
, MatchOperator
, ReduceOperator
, SomeOperator
, LastOperator
, ToArrayOperator
, ToSetOperator

, EachAsyncOperator
, EveryAsyncOperator
, FindAsyncOperator
, ReduceAsyncOperator
, SomeAsyncOperator
])
