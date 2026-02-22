import { describe, it, expect } from 'vitest'
import { Container } from '.'

describe('@o.z/zdi', () => {
  it('Test singleton in Container', async () => {
    class Engine {
      constructor(public model: string) { }
    }

    class Plate {
      constructor(public number: number) { }
    }

    class Car {
      public random: number = Math.random();
      constructor(
        public engine: Engine,
        public plate: Plate
      ) { }
    }
    const container = new Container();

    container.registerClass(Engine, ['mx23'], true);
    container.registerClass(Plate, [123]);
    container.registerClass(Car, [Engine, Plate]);

    // Usage
    const c1 = container.get(Car);
    const c2 = container.get(Car);

    expect((c1 === c2)).toBe(false)
    expect(c1.engine === c2.engine).toBe(true)

    await container.dispose();
  })
})
