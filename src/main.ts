import { Container } from "./lib";

class Engine {
  public random: number = Math.random();
  constructor(public model: string) { }
}

class Plate {
  public random: number = Math.random();
  constructor(public number: number) { }
}

class Car {
  public random: number = Math.random();
  constructor(
    public engine: Engine,
    public plate: Plate
  ) { }
}

// Setup
const container = new Container();

container.registerClass(Engine, ['mx23'], true);
container.registerClass(Plate, [123]);
container.registerClass(Car, [Engine, Plate]);

// Usage
const c1 = container.get(Car);
const c2 = container.get(Car);

console.log('c1:', c1);
console.log('c2:', c2);
console.log('Same car instance?', c1 === c2);
console.log('Same engine?', c1.engine === c2.engine);

// Cleanup
await container.dispose();
