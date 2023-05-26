<template>
  <div class="flex justify-between sticky -bottom-10 p-2 text-sm bg-pima-color-blue text-white">
    <div>Copyright&copy; 2023, Pima County Arizona, all rights reserved</div>
    <div>
      <div class="flex space-x-3 align-middle">
        <a href="https://services.pima.gov/TDClient/186/Portal/Home/" target="_blank">
          <div class="flex">
            <mdicon name="bug-outline" class="mr-1" width="20" />
            Report Issue
          </div>
        </a>
        <div class="ml-2">v{{ version }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const version = import.meta.env.VITE_CLIENT_VERSION;
</script>

<style scoped></style>
