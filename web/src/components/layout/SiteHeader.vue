<template>
  <header>
    <div v-if="isDev" class="whatenv">
      <span>DEV</span>
    </div>
    <div class="flex bg-pima-color-blue justify-between p-2 text-white font-light">
      <div class="flex">
        <img src="@/assets/logos/pima-county-logo_sm.png" class="my-1 ml-3" />
        <div class="flex items-center px-2 mx-4 text-2xl uppercase font-light tracking-wider">
          Todo Vuedoo
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isDev = ref(true);
if (import.meta.env.VITE_ENVIRONMENT !== "DEV") {
  isDev.value = false;
}
</script>

<style scoped>
.whatenv {
  height: 40px;
  background-color: red;
  position: absolute;
  top: 25px;
  left: -60px;
  width: 200px;
  z-index: 100;
  color: white;
  line-height: 40px;
  font-size: 1em;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.5) 5px 5px;
  transform: rotate(-45deg);
  font-weight: bold;
}

@media only screen and (max-width: 767px) {
  .whatenv {
    height: 20px;
    top: 18px;
    left: -45px;
    width: 150px;
    line-height: 20px;
    font-size: 0.75em;
    box-shadow: rgba(0, 0, 0, 0.5) 3px 3px;
  }
}

.hidebanner {
  display: none;
}
</style>
