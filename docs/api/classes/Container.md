[**@o.z/zdi API**](../README.md)

***

# Class: Container

Defined in: [src/lib/index.ts:16](https://github.com/z-npm/zdi/blob/da70bd8012c033ee758481367198eed485ffd13f/src/lib/index.ts#L16)

Dependency Injection Container for TypeScript/JavaScript applications.
Supports transient and singleton services, automatic dependency resolution,
and safe disposal of resources.

## Example

```ts
const container = new Container();
container.registerClass(Logger, []);
container.registerClass(Database, [Logger], true); // singleton
container.registerClass(UserService, [Database, Logger]);

const userService = container.get(UserService);
```

## Constructors

### Constructor

> **new Container**(): `Container`

#### Returns

`Container`

## Methods

### register()

> **register**\<`T`\>(`token`, `factory`): `void`

Defined in: [src/lib/index.ts:44](https://github.com/z-npm/zdi/blob/da70bd8012c033ee758481367198eed485ffd13f/src/lib/index.ts#L44)

Registers a transient service (new instance created on each resolution).

#### Type Parameters

##### T

`T`

#### Parameters

##### token

[`Constructor`](../type-aliases/Constructor.md)\<`T`\>

The constructor token identifying the service.

##### factory

() => `T`

Factory function that produces the service instance.

#### Returns

`void`

#### Throws

Error if the token is already registered.

#### Example

```ts
container.register(HttpClient, () => new HttpClient({ timeout: 5000 }));
```

***

### registerSingleton()

> **registerSingleton**\<`T`\>(`token`, `factory`): `void`

Defined in: [src/lib/index.ts:59](https://github.com/z-npm/zdi/blob/da70bd8012c033ee758481367198eed485ffd13f/src/lib/index.ts#L59)

Registers a singleton service (one instance shared across all resolutions).

#### Type Parameters

##### T

`T`

#### Parameters

##### token

[`Constructor`](../type-aliases/Constructor.md)\<`T`\>

The constructor token identifying the service.

##### factory

() => `T`

Factory function that produces the service instance.

#### Returns

`void`

#### Throws

Error if the token is already registered.

#### Example

```ts
container.registerSingleton(Config, () => loadConfig());
```

***

### registerClass()

> **registerClass**\<`T`, `A`\>(`token`, `dependencies`, `singleton?`, `disposeCallback?`): `void`

Defined in: [src/lib/index.ts:80](https://github.com/z-npm/zdi/blob/da70bd8012c033ee758481367198eed485ffd13f/src/lib/index.ts#L80)

Registers a class with automatic dependency resolution.

#### Type Parameters

##### T

`T`

##### A

`A` *extends* `any`[]

#### Parameters

##### token

(...`args`) => `T`

The class constructor to register.

##### dependencies

\{ \[I in string \| number \| symbol\]: A\[I\] extends Param ? Param \| Constructor\<Param, any\[\]\> : never \}

Array of dependencies: either constructor tokens for
                      auto-resolution or pre-resolved values.

##### singleton?

`boolean` = `false`

Whether to register as a singleton (default: false).

##### disposeCallback?

(`instance`) => `void`

Optional callback to clean up resources when container is disposed.

#### Returns

`void`

#### Example

```ts
container.registerClass(Engine, ['mx23']);
container.registerClass(Plate, [123]);
container.registerClass(Car, [Engine, Plate], true);
```

***

### get()

> **get**\<`T`\>(`token`): `T`

Defined in: [src/lib/index.ts:124](https://github.com/z-npm/zdi/blob/da70bd8012c033ee758481367198eed485ffd13f/src/lib/index.ts#L124)

Resolves and returns an instance of the requested service.

#### Type Parameters

##### T

`T`

#### Parameters

##### token

[`Constructor`](../type-aliases/Constructor.md)\<`T`\>

The constructor token identifying the service to resolve.

#### Returns

`T`

An instance of the requested service.

#### Throws

Error if the service is not registered or if instantiation fails.

#### Example

```ts
const car = container.get(Car);
```

***

### has()

> **has**\<`T`\>(`token`): `boolean`

Defined in: [src/lib/index.ts:155](https://github.com/z-npm/zdi/blob/da70bd8012c033ee758481367198eed485ffd13f/src/lib/index.ts#L155)

Checks if a service is registered in the container.

#### Type Parameters

##### T

`T`

#### Parameters

##### token

[`Constructor`](../type-aliases/Constructor.md)\<`T`\>

The constructor token to check.

#### Returns

`boolean`

True if the service is registered, false otherwise.

***

### dispose()

> **dispose**(): `Promise`\<`void`\>

Defined in: [src/lib/index.ts:166](https://github.com/z-npm/zdi/blob/da70bd8012c033ee758481367198eed485ffd13f/src/lib/index.ts#L166)

Disposes all singleton services that have disposal callbacks.
Call this when shutting down your application to clean up resources.

#### Returns

`Promise`\<`void`\>

#### Example

```ts
await container.dispose();
```

***

### createChild()

> **createChild**(): `Container`

Defined in: [src/lib/index.ts:193](https://github.com/z-npm/zdi/blob/da70bd8012c033ee758481367198eed485ffd13f/src/lib/index.ts#L193)

Creates a child container that inherits registrations from the parent
but maintains separate singleton instances.

#### Returns

`Container`

A new child Container instance.

#### Example

```ts
const childContainer = container.createChild();
childContainer.registerSingleton(FeatureFlag, () => new FeatureFlag('test'));
```
