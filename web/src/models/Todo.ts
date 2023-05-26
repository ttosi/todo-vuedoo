import { Entity } from "./Entity";

export class Todo extends Entity {
  constructor(public completed: boolean = false, public completedDate: Date = new Date()) {
    super();
  }
}
