<template>
  <div class="flex justify-center mt-4">
    <el-card class="box-card min-h-[70vh] min-w-[20vw]">
      <template #header>
        <div class="flex flex-wrap justify-between card-header">
          <div class="font-bold text-lg">Todo Vuedoo</div>
          <div class="text-right text-xs">
            <div>Todo: {{ todos.filter((t) => !t.completed).length }}</div>
            <div>Completed: {{ todos.filter((t) => t.completed).length }}</div>
          </div>
        </div>
      </template>
      <div class="flex justify-between">
        <el-input v-model="title" class="mb-3 mr-3" @keyup.enter="add" />
        <el-button class="" type="primary" @click="add">ADD</el-button>
      </div>
      <div class="flex-col border rounded-md overflow-auto h-[400px]">
        <!-- if there are 1 or more todos, list them out using v-for using the todo-item component -->
        <!-- :todo="todo" is a prop which is sent to the TodoItem component -->
        <!-- @complete and @remove the methods that're called when the event is emitted from the child -->
        <div v-if="todos.length > 0">
          <todo-item
            v-for="todo in sortedTodos"
            :key="todo.id"
            :todo="todo"
            @complete="complete"
            @remove="remove" />
        </div>
        <!-- if there are 0 todos, show this div -->
        <div v-else class="no-todos">Nothing to do!</div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { storeToRefs } from "pinia"; // storeToRefs makes the props in the store reactive
import { Todo } from "@/models/Todo";
import { useTodoStore } from "@/stores/todoStore";
import TodoItem from "@/components/TodoItem.vue";
import { useNotification } from "@/use/notification";
import { useShowConfirmDialog, confirmTitle, confirmMessage } from "@/use/confirmDialog";

const todoStore = useTodoStore(); // this hold the events in the store
const { todo, todos } = storeToRefs(todoStore); // destructor for the props in the store

// creates a reactive reference for the v-model in the textbox
const title = ref("");

// call the todoStore to get the list of todos from the api
const load = async () => {
  await todoStore.list();
};
load();

const add = () => {
  if (title.value.trim().length === 0) return; //don't allow adding empty todo

  todo.value = new Todo(); // create a new todo in the store

  // use .value on refs, it "unwraps" it so the value can be accessed
  todo.value.title = title.value;
  const id: any = todoStore.create(todo.value); // for new todo, the id is returned from the api
  todo.value.id = id;
  todos.value.unshift(todo.value); // add new todo to top of the list in the ui

  title.value = "";
};

// send todo to store after setting the values
const complete = (todo: Todo) => {
  todo.completed = true;
  todo.completedDate = new Date();
  todoStore.update(todo);
};

const remove = async (todo: Todo) => {
  confirmTitle.value = "Delete";
  confirmMessage.value = "Are you sure you want to delete this todo?";

  const response = await useShowConfirmDialog();
  if (response) {
    await todoStore.delete(todo.id);
    todos.value.splice(todos.value.indexOf(todo), 1); // remove the todo from the list in the ui

    useNotification.type = "success";
    useNotification.show("Todo successfully deleted");
  }
};

// returns a sorted list that shows the completed todos at the bottom
const sortedTodos = computed(() => {
  return todos.value.sort((a: any, b: any) => a.completed - b.completed);
});
</script>

<style>
.no-todos {
  @apply flex mt-5 text-slate-500 text-sm justify-center;
}
</style>
