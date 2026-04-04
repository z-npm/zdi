# @o.z/zdi ⚡

[![npm version](https://img.shields.io/npm/v/@o.z/zdi?style=flat-square)](https://www.npmjs.com/package/@o.z/zdi)
[![license](https://img.shields.io/npm/l/@o.z/zdi?style=flat-square)](https://www.npmjs.com/package/@o.z/zdi)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0+-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

A lightweight, type-safe Dependency Injection container for TypeScript/JavaScript applications.

## Features

- ✅ Zero dependencies
- ✅ Type-safe (written in TypeScript)
- ✅ Transient and singleton services
- ✅ Automatic dependency resolution
- ✅ Child containers with isolated instances
- ✅ Resource disposal for graceful shutdown
- ✅ Custom error classes for clear debugging

## Installation

```bash
yarn add @o.z/zdi
```

```bash
npm install @o.z/zdi
```

```bash
pnpm add @o.z/zdi
```

## Quick Start

```typescript
import { Container } from '@o.z/zdi';

// Define some classes
class Logger {
  log(message: string) { console.log(message); }
}

class Database {
  constructor(private logger: Logger) {}
  query(sql: string) {
    this.logger.log(`Executing query: ${sql}`);
    // ...
  }
}

// Create container and register services
const container = new Container();
container.registerClass(Logger, []); // transient
container.registerClass(Database, [Logger], true); // singleton

// Resolve instances
const db1 = container.get(Database);
const db2 = container.get(Database);
console.log(db1 === db2); // true (singleton)

const logger1 = container.get(Logger);
const logger2 = container.get(Logger);
console.log(logger1 === logger2); // false (transient)
```

## API Overview

Full API documentation is available at [docs/api/README.md](./docs/api/README.md).

### Core Methods

- **`register<T>(token, factory)`** – Registers a transient service using a factory function.
- **`registerSingleton<T>(token, factory)`** – Registers a singleton service using a factory.
- **`registerClass<T>(token, dependencies, singleton?, disposeCallback?)`** – Registers a class with automatic dependency resolution.
- **`get<T>(token)`** – Resolves a service instance.
- **`has<T>(token)`** – Checks if a service is registered.
- **`dispose()`** – Cleans up all singleton instances that implement `Disposable`.
- **`createChild()`** – Creates a child container inheriting registrations but with separate singleton instances.

### Error Handling

The library throws specific errors to help you debug:

- `ServiceNotFoundError` – Thrown when trying to resolve an unregistered service.
- `DuplicateRegistrationError` – Thrown when registering a service that already exists.
- `InstantiationError` – Thrown when a service factory throws an error.

## Advanced Usage

### Child Containers

Child containers allow you to create isolated scopes (e.g., per request) while sharing parent registrations.

```typescript
const parent = new Container();
parent.registerClass(Config, [() => ({ apiUrl: 'https://api.example.com' })], true);

const child = parent.createChild();
child.registerClass(RequestContext, [() => ({ userId: 123 })]); // request-scoped

const config = child.get(Config); // inherited from parent
const context = child.get(RequestContext); // child-specific
```

### Disposal

Services that need cleanup can provide a disposal callback. The container will invoke it when `dispose()` is called.

```typescript
container.registerClass(
  DatabaseConnection,
  [Config],
  true, // singleton
  (conn) => conn.close() // dispose callback
);

// Later, during shutdown:
await container.dispose();
```

Alternatively, services can implement the `Disposable` interface (with a `dispose` method) and the container will automatically call it if registered.

## Type Safety

The container is fully typed. Dependencies are checked at compile time:

```typescript
container.registerClass(Car, [Engine, Plate]); // ✅ correct
container.registerClass(Car, [Engine, 'wrong-type']); // ❌ TypeScript error
```

---

## License and AI Training

This project is licensed under the GNU General Public License v3.0 (GPLv3).

The authors of this software consider the use of this code, including its source code, documentation, and any other project artifacts, for the training of artificial intelligence (AI) systems (including but not limited to machine learning, large language models, and other AI technologies) to be creating a derivative work. As such, any entity using this code for such purposes must comply with the terms of the GPLv3. This includes, but is not limited to, making the entire source code of the AI system that uses this code available under the same GPLv3 license.

If you wish to use this code for AI training without being subject to the GPLv3, please contact the authors to negotiate a separate license.
