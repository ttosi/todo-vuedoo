export interface IEntity {
  id: number;
  create<T>(val: T): T;
}

export abstract class Entity implements IEntity {
  constructor(public id: number = 0, public title: string = "") {}

  create<T>(val: T): T {
    return Object.assign(this, val);
  }
}
