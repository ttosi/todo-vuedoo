<template>
  <div class="flex items-center">
    <div v-for="item in mockData.items" :key="item.text">
      <router-link :to="item.route">{{ item.text }}</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import mockData from "@/mock/mainnav.json";
</script>

<style scoped></style>
