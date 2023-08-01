<template>
  <div class="flex justify-center mt-4">
    <el-card class="box-card min-h-[70vh] min-w-[20vw]">
      <template #header>
        <div class="flex flex-wrap justify-between card-header">
          <div class="font-bold text-lg">Todo Vuedoo</div>
          <div class="text-right text-xs">
            <div>Todo: {{ incomplete }}</div>
            <div>Completed: {{ completed }}</div>
          </div>
        </div>
      </template>
      <div class="flex justify-between">
        <el-input v-model="title" class="mb-3 mr-3" @keyup.enter="add" />
        <el-button class="" type="primary" @click="add">ADD</el-button>
      </div>
      <div class="flex-col border rounded-md overflow-auto h-[400px]">
        <!-- if there are 1 or more todos, list them out using v-for using todo-item component -->
        <!-- :todo="todo" is a prop which is sent to TodoItem component -->
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
import { useNotification } from "@/composables/useNotification";
import { useShowConfirmDialog, confirmTitle, confirmMessage } from "@/composables/useConfirmDialog";

const todoStore = useTodoStore(); // this holds the actions in the todoStore
const { todo, todos } = storeToRefs(todoStore); // destructor for the props in todoStore

// creates a reactive reference for the v-model in the input
const title = ref<string>("");

// call todoStore to get list of todos from the api
// load is just a wrapper to avoid using <Suspense></Suspense>
const load = async () => {
  await todoStore.list();
};
load();

const add = () => {
  if (title.value.trim().length === 0) return; //don't allow adding an empty todo

  todo.value = new Todo(); // create a new todo in the store
  todo.value.title = title.value; // use .value on refs
  const id: any = todoStore.create(todo.value); // for new todos, id is returned from the api
  todo.value.id = id;
  todos.value.unshift(todo.value); // add new todo to top of list in the ui

  title.value = ""; // reset textbox
};

// update todo and call update from todo store
const complete = (todo: Todo) => {
  todo.completed = true;
  todo.completedDate = new Date();
  todoStore.update(todo);
};

const remove = async (todo: Todo) => {
  confirmTitle.value = "Delete";
  confirmMessage.value = "Are you sure you want to delete this todo?";
  const response = await useShowConfirmDialog(); // await for user input from confirmation dialog

  if (response) {
    await todoStore.delete(todo.id);
    todos.value.splice(todos.value.indexOf(todo), 1); // remove todo from list in ui

    // show success notification
    useNotification.type = "success";
    useNotification.show("Todo successfully deleted");
  }
};

// returns a sorted list that shows completed todos at the bottom
const sortedTodos = computed(() => {
  return todos.value.sort((a: any, b: any) => a.completed - b.completed);
});

const incomplete = computed(() => {
  return todos.value.filter((t) => !t.completed).length;
});

const completed = computed(() => {
  return todos.value.filter((t) => t.completed).length;
});
</script>

<style>
.no-todos {
  @apply flex mt-5 text-slate-500 text-sm justify-center;
}
</style>
