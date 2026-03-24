[**@o.z/zdi API**](../README.md)

***

# Class: DuplicateRegistrationError

Defined in: [src/lib/index.ts:275](https://github.com/z-npm/zdi/blob/e11019274cc8210d4876d974765efeb869444d1c/src/lib/index.ts#L275)

Error thrown when attempting to register an already-registered service.

## Extends

- `Error`

## Constructors

### Constructor

> **new DuplicateRegistrationError**(`token`): `DuplicateRegistrationError`

Defined in: [src/lib/index.ts:276](https://github.com/z-npm/zdi/blob/e11019274cc8210d4876d974765efeb869444d1c/src/lib/index.ts#L276)

#### Parameters

##### token

[`Constructor`](../type-aliases/Constructor.md)\<`any`\>

#### Returns

`DuplicateRegistrationError`

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
