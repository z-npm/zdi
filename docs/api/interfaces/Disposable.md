[**@o.z/zdi API**](../README.md)

***

# Interface: Disposable

Defined in: [src/lib/index.ts:239](https://github.com/z-npm/zdi/blob/da70bd8012c033ee758481367198eed485ffd13f/src/lib/index.ts#L239)

Interface for disposable services.

## Properties

### dispose

> **dispose**: (`instance`) => `void` \| `Promise`\<`void`\>

Defined in: [src/lib/index.ts:244](https://github.com/z-npm/zdi/blob/da70bd8012c033ee758481367198eed485ffd13f/src/lib/index.ts#L244)

Cleans up resources. Can be synchronous or asynchronous.

#### Parameters

##### instance

`any`

The instance to dispose.

#### Returns

`void` \| `Promise`\<`void`\>
