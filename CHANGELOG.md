# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [5.0.0](https://github.com/BlackGlory/iterable-operator/compare/v4.0.7...v5.0.0) (2024-01-29)


### ⚠ BREAKING CHANGES

* The function signature of `lastAsync` changed
* The function signature of `takeRightAsync` changed
* - The implementation of `dropAsync` was changed to match the new function signature.
- The implementation of `dropUntilAsync` was changed to match the new function signature.
* The implementation of the function was changed to match the new function signature.
* Node.js v16 => Node.js v18.17.0

### Features

* improve `lastAsync` ([ccec217](https://github.com/BlackGlory/iterable-operator/commit/ccec217e51367bec07fbdb2b4cb198693641689d))
* improve `takeRightAsync` ([417bde3](https://github.com/BlackGlory/iterable-operator/commit/417bde3a9485c256d0d01096464d7928b7bf6d4b))


### Bug Fixes

* function signatures ([f82bcbc](https://github.com/BlackGlory/iterable-operator/commit/f82bcbc419823af7a449cfdd1a573fec3c700f5a))
* function signatures ([5cc42dd](https://github.com/BlackGlory/iterable-operator/commit/5cc42ddba0bfcc4157e4b7834ea5fbdc90ef47be))
* the function siganture of `uniqAsync` ([0970fa4](https://github.com/BlackGlory/iterable-operator/commit/0970fa432a361cfa4f7082e5aa6a104f6d212670))
* the function signature of `flatMapAsync` ([736f296](https://github.com/BlackGlory/iterable-operator/commit/736f29692c080b45c7c6766879f4534286a6aef1))
* the function signature of `reduceAsync` ([064fce8](https://github.com/BlackGlory/iterable-operator/commit/064fce80aa588a92e4b1ccd8b08cb5a93da65eba))
* the function signature of `reduceAsync` ([c0b64e6](https://github.com/BlackGlory/iterable-operator/commit/c0b64e6f48274ef28584152a6615464f4b54d2a6))


* upgrade dependencies ([3c1b941](https://github.com/BlackGlory/iterable-operator/commit/3c1b94143e2e3e5f26e613e633e6ce8d1280acb2))

### [4.0.7](https://github.com/BlackGlory/iterable-operator/compare/v4.0.6...v4.0.7) (2024-01-29)


### Bug Fixes

* async methods' signatures (close [#30](https://github.com/BlackGlory/iterable-operator/issues/30)) ([6c3b31a](https://github.com/BlackGlory/iterable-operator/commit/6c3b31a62538b91139b608d2bd8832f928558df2))

### [4.0.6](https://github.com/BlackGlory/iterable-operator/compare/v4.0.5...v4.0.6) (2023-04-05)

### [4.0.5](https://github.com/BlackGlory/iterable-operator/compare/v4.0.4...v4.0.5) (2023-03-25)

### [4.0.4](https://github.com/BlackGlory/iterable-operator/compare/v4.0.3...v4.0.4) (2023-03-25)

### [4.0.3](https://github.com/BlackGlory/iterable-operator/compare/v4.0.2...v4.0.3) (2023-01-26)

### [4.0.2](https://github.com/BlackGlory/iterable-operator/compare/v4.0.1...v4.0.2) (2023-01-22)

### [4.0.1](https://github.com/BlackGlory/iterable-operator/compare/v4.0.0...v4.0.1) (2023-01-22)

## [4.0.0](https://github.com/BlackGlory/iterable-operator/compare/v3.1.1...v4.0.0) (2023-01-21)


### ⚠ BREAKING CHANGES

* CommonJS => ESM

* commonjs => esm ([584bf16](https://github.com/BlackGlory/iterable-operator/commit/584bf16cc60537f704a474f882ecee15d8b4c55e))

### [3.1.1](https://github.com/BlackGlory/iterable-operator/compare/v3.1.0...v3.1.1) (2023-01-21)

## [3.1.0](https://github.com/BlackGlory/iterable-operator/compare/v3.0.0...v3.1.0) (2022-12-22)


### Features

* add `top`, `topAsync` ([c70cc66](https://github.com/BlackGlory/iterable-operator/commit/c70cc6600aa11d3f4809974ba65a2f07874a8ea0))

## [3.0.0](https://github.com/BlackGlory/iterable-operator/compare/v2.5.0...v3.0.0) (2022-12-21)


### ⚠ BREAKING CHANGES

* The minimal version of Node.js is 16.

### Features

* add `prefetch`, `prefetchAsync` ([385aa71](https://github.com/BlackGlory/iterable-operator/commit/385aa719dcad55f3a92408eca5af03e553c34bc5))

## [2.5.0](https://github.com/BlackGlory/iterable-operator/compare/v2.4.0...v2.5.0) (2022-11-15)


### Features

* add `flatMap`, `flatMapAsync` ([17ebd65](https://github.com/BlackGlory/iterable-operator/commit/17ebd6532f3918b9a4202e30cfd79aed170a556f))

## [2.4.0](https://github.com/BlackGlory/iterable-operator/compare/v2.3.0...v2.4.0) (2022-11-14)


### Features

* add `join`, `joinAsync` ([edd411e](https://github.com/BlackGlory/iterable-operator/commit/edd411eae033f41a27a5ecfc572982d34bb6bfc2))

## [2.3.0](https://github.com/BlackGlory/iterable-operator/compare/v2.2.0...v2.3.0) (2022-11-09)


### Features

* add `findAllIndexes` ([7ab8627](https://github.com/BlackGlory/iterable-operator/commit/7ab86270864af9fa7d771fa830fcd23bad44928b))

## [2.2.0](https://github.com/BlackGlory/iterable-operator/compare/v2.1.0...v2.2.0) (2022-11-07)


### Features

* add `isIterable`, `isAsyncIterable`, `isntIterable`, `isntAsyncIterable` ([5562349](https://github.com/BlackGlory/iterable-operator/commit/5562349290cd44be1a452c8d50015509209e81b4))

## [2.1.0](https://github.com/BlackGlory/iterable-operator/compare/v2.0.0...v2.1.0) (2022-10-20)


### Features

* add `intersection`, `intersectionAsync` ([b91fd89](https://github.com/BlackGlory/iterable-operator/commit/b91fd89a6e3ad970fcbf9d92e664b45671af479f))

## [2.0.0](https://github.com/BlackGlory/iterable-operator/compare/v1.2.1...v2.0.0) (2022-10-19)


### ⚠ BREAKING CHANGES

* Removed `match`, `matchAsync`
* The signature of `consume` changed
* The three styles of operators have been removed due to increasing maintenance costs.
The pipeline style seems to be the only promising style that will be implemented directly in operators in future commits.

### Features

* add `difference`, `differenceAsync`, `consumeAsync` ([b0610f1](https://github.com/BlackGlory/iterable-operator/commit/b0610f1d54ecc3a3121294bf73b97637eed2090e))
* remove `match`, `matchAsync` ([8260fb6](https://github.com/BlackGlory/iterable-operator/commit/8260fb6983f3c1085f119e11d9a634fb78ce6b77))


* remove styles ([1b8a6da](https://github.com/BlackGlory/iterable-operator/commit/1b8a6da38abd4abdde0672084051c51a85155790))

### [1.2.1](https://github.com/BlackGlory/iterable-operator/compare/v1.2.0...v1.2.1) (2022-08-21)

## [1.2.0](https://github.com/BlackGlory/iterable-operator/compare/v1.1.0...v1.2.0) (2022-08-02)


### Features

* add groupBy, groupByAsync ([44aefa0](https://github.com/BlackGlory/iterable-operator/commit/44aefa0058e0732ed74d4568c051382527319773))

## [1.1.0](https://github.com/BlackGlory/iterable-operator/compare/v1.0.1...v1.1.0) (2022-04-11)


### Features

* add count, countAsync ([4cf7e63](https://github.com/BlackGlory/iterable-operator/commit/4cf7e6314c55097f10809830cd3d1059c7fc178f))


### Bug Fixes

* signatures of consume ([6722c39](https://github.com/BlackGlory/iterable-operator/commit/6722c399513b1872832f90ec8592931127f0c370))

### [1.0.1](https://github.com/BlackGlory/iterable-operator/compare/v1.0.0...v1.0.1) (2022-03-19)

## [1.0.0](https://github.com/BlackGlory/iterable-operator/compare/v0.14.5...v1.0.0) (2022-03-05)

### [0.14.5](https://github.com/BlackGlory/iterable-operator/compare/v0.14.4...v0.14.5) (2022-01-05)

### [0.14.4](https://github.com/BlackGlory/iterable-operator/compare/v0.14.3...v0.14.4) (2021-10-14)

### [0.14.3](https://github.com/BlackGlory/iterable-operator/compare/v0.14.2...v0.14.3) (2021-08-28)

### [0.14.2](https://github.com/BlackGlory/iterable-operator/compare/v0.14.1...v0.14.2) (2021-07-12)


### Bug Fixes

* close unexhausted iterators ([25fa969](https://github.com/BlackGlory/iterable-operator/commit/25fa96920ddd682444da3802577b2a671e521944))

### [0.14.1](https://github.com/BlackGlory/iterable-operator/compare/v0.14.0...v0.14.1) (2021-07-03)

## [0.14.0](https://github.com/BlackGlory/iterable-operator/compare/v0.13.6...v0.14.0) (2021-05-16)


### ⚠ BREAKING CHANGES

* rewrite

### Bug Fixes

* https://github.com/BlackGlory/iterable-operator/issues/4 ([8f7645b](https://github.com/BlackGlory/iterable-operator/commit/8f7645ba5c2918b961f56b3db5e9ddbdd0e09a7c))

### [0.13.6](https://github.com/BlackGlory/iterable-operator/compare/v0.13.5...v0.13.6) (2021-03-24)


### Features

* improve signatures ([fcea188](https://github.com/BlackGlory/iterable-operator/commit/fcea1889e51e908ed6075e6a457d806a00dc3f11))

### [0.13.5](https://github.com/BlackGlory/iterable-operator/compare/v0.13.4...v0.13.5) (2021-03-17)

### [0.13.4](https://github.com/BlackGlory/iterable-operator/compare/v0.13.3...v0.13.4) (2021-03-05)

### [0.13.3](https://github.com/BlackGlory/iterable-operator/compare/v0.13.2...v0.13.3) (2021-02-25)

### [0.13.2](https://github.com/BlackGlory/iterable-operator/compare/v0.13.1...v0.13.2) (2021-02-03)


### Bug Fixes

* bundle ([7fb81cc](https://github.com/BlackGlory/iterable-operator/commit/7fb81cc2b5c4d779e2029455f2b965a629a71130))

### [0.13.1](https://github.com/BlackGlory/iterable-operator/compare/v0.13.0...v0.13.1) (2021-02-03)

## [0.13.0](https://github.com/BlackGlory/iterable-operator/compare/v0.12.11...v0.13.0) (2021-01-29)


### ⚠ BREAKING CHANGES

* input operators were moved to `extra-generator` package

### Features

* remove input operators ([5235ff6](https://github.com/BlackGlory/iterable-operator/commit/5235ff6e46796a5f83fa737621311f8145bede6c))

### [0.12.11](https://github.com/BlackGlory/iterable-operator/compare/v0.12.10...v0.12.11) (2021-01-24)

### [0.12.10](https://github.com/BlackGlory/iterable-operator/compare/v0.12.9...v0.12.10) (2021-01-24)


### Features

* add of ([ad79afa](https://github.com/BlackGlory/iterable-operator/commit/ad79afaebc4a0ed1b15f015e69ed9332c0fe47f6))

### [0.12.9](https://github.com/BlackGlory/iterable-operator/compare/v0.12.8...v0.12.9) (2021-01-20)

### [0.12.8](https://github.com/BlackGlory/iterable-operator/compare/v0.12.7...v0.12.8) (2021-01-20)

### [0.12.7](https://github.com/BlackGlory/iterable-operator/compare/v0.12.6...v0.12.7) (2021-01-15)


### Bug Fixes

* esm bundle ([e5d0e1a](https://github.com/BlackGlory/iterable-operator/commit/e5d0e1acdd7f21bf8835b2d229ea660c6425e66c))

### [0.12.6](https://github.com/BlackGlory/iterable-operator/compare/v0.12.5...v0.12.6) (2021-01-04)


### Bug Fixes

* target ([762f80d](https://github.com/BlackGlory/iterable-operator/commit/762f80d050fb345c81d68f0011244d0ed00f5876))

### [0.12.5](https://github.com/BlackGlory/iterable-operator/compare/v0.12.4...v0.12.5) (2021-01-04)

### [0.12.4](https://github.com/BlackGlory/iterable-operator/compare/v0.12.3...v0.12.4) (2020-12-23)


### Bug Fixes

* bundle ([535ea23](https://github.com/BlackGlory/iterable-operator/commit/535ea2360f05305e958fc3c7fa3871f770e3c30f))

### [0.12.3](https://github.com/BlackGlory/iterable-operator/compare/v0.12.2...v0.12.3) (2020-12-23)

### [0.12.2](https://github.com/BlackGlory/iterable-operator/compare/v0.12.1...v0.12.2) (2020-10-10)
