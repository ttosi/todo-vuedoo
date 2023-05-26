<template>
  <div class="flex justify-between border-b h-12 items-center">
    <div class="flex-col p-2">
      <div class="text-sm" :class="{ completed: todo.completed }">
        {{ todo.title }}
      </div>
      <div v-if="todo.completed" class="text-xs text-slate-500">
        {{ useTimeAgo(new Date(todo.completedDate)).value }}
      </div>
    </div>
    <div class="flex text-slate-500 mr-2 cursor-pointer">
      <mdicon v-if="!todo.completed" name="check-bold" size="18" @click="$emit('complete', todo)" />
      <mdicon name="trash-can-outline" size="18" @click="$emit('remove', todo)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTimeAgo } from "@vueuse/core";
import { Todo } from "@/models/Todo";

// line 12 & 13 use emits. This sends the todo back to the specified
// method in the parent (HomeView) so it can apply the changes. Vue doesn't
// allow mutating any values in the child

// setup the prop to use in the template
defineProps({
  todo: { type: Todo, required: true },
});
</script>

<style scoped>
.completed {
  @apply text-slate-500 line-through;
}
</style>
