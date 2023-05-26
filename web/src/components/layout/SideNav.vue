<template>
  <menu class="mt-3 pr-2 ml-3 w-[425px]">
    <ul class="space-y-1">
      <li v-for="item in data.items" :key="item.text">
        <div v-if="item.type === 'label'" class="pb-2">
          <div
            class="bg-pima-color-blue p-2 pl-2 mb-0 uppercase text-xs tracking-wide text-white font-semibold">
            {{ item.text }}
          </div>
          <ul class="ml-0.5 pt-2 border-l-2 border-gray-400">
            <li v-for="subItem in item.items" :key="subItem.text" class="pb-1">
              <!-- <router-link :to="subItem.route"> -->
              <div
                class="flex items-center text-sm ml-1 p-1 cursor-pointer hover:bg-gray-200"
                :class="{ active: path === subItem.route }">
                <mdicon :name="subItem.icon" height="20" class="text-gray-500 mr-2" />
                {{ subItem.text }}
              </div>
              <!-- </router-link> -->
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </menu>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import data from "@/mock/sidenav.json";

const route = useRoute();
const path = computed(() => route.path);
</script>

<style scoped>
.active {
  @apply bg-gray-100 font-semibold;
}
</style>
