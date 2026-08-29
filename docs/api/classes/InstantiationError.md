[**@o.z/zdi API**](../README.md)

***

# Class: InstantiationError

Defined in: [src/lib/index.ts:264](https://github.com/z-npm/zdi/blob/9ba35e52764af7524c3a76e053d270b6bf2e00c0/src/lib/index.ts#L264)

Error thrown when a service fails to instantiate.

## Extends

- `Error`

## Constructors

### Constructor

> **new InstantiationError**(`token`, `cause`): `InstantiationError`

Defined in: [src/lib/index.ts:265](https://github.com/z-npm/zdi/blob/9ba35e52764af7524c3a76e053d270b6bf2e00c0/src/lib/index.ts#L265)

#### Parameters

##### token

[`Constructor`](../type-aliases/Constructor.md)\<`any`\>

##### cause

`Error`

#### Returns

`InstantiationError`

#### Overrides

`Error.constructor`

## Properties

### cause?

> `optional` **cause?**: `unknown`

Defined in: node\_modules/typescript/lib/lib.es2022.error.d.ts:24

#### Inherited from

`Error.cause`

***

### name

> **name**: `string`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1074

#### Inherited from

`Error.name`

***

### message

> **message**: `string`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1075

#### Inherited from

`Error.message`

***

### stack?

> `optional` **stack?**: `string`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1076

#### Inherited from

`Error.stack`
