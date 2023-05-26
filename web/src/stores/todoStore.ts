import { defineStore } from "pinia";
import { network } from "@/services/network";
import { Todo } from "@/models/Todo";
import { getObjectsFromJson } from "@/services/utils";

// stores are used for state management, the state of the props
// is accessible from any view or component
export const useTodoStore = defineStore("todo", {
  state: () => {
    return {
      endpoint: "/todos",
      todo: new Todo(),
      todos: [] as Todo[],
    };
  },
  // actions contain the methods for todo(s)
  // in this case, all methods are used for communicating with api
  actions: {
    async list() {
      const todos = await network.get(`${this.endpoint}/`);
      this.todos = getObjectsFromJson(Todo, todos as Todo[]);
    },
    async create(todo: Todo) {
      await network.post(`${this.endpoint}/`, todo).then((res: any) => (todo.id = res.id));
    },
    async update(todo: Todo) {
      await network.put(`${this.endpoint}/${todo.id}`, todo);
    },
    async delete(id: number) {
      await network.delete(`${this.endpoint}/${id}`);
    },
  },
});
