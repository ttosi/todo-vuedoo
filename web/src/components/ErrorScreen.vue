<template>
  <div class="ml-5 mt-5">
    <el-button type="primary" @click="navigate">
      <mdicon name="arrow-left" class="mr-2" />
      Home
    </el-button>
  </div>
  <div class="flex-col mt-20">
    <div class="flex justify-center">
      <mdicon :name="error?.icon" class="text-pima-color-blue" size="100"></mdicon>
    </div>
    <div class="flex justify-center font-bold text-3xl mt-3 text-slate-600">
      {{ error?.message1 }}
    </div>
    <div class="flex justify-center text-sm mt-2 text-slate-600">
      {{ error?.message2 }}
    </div>
    <div class="flex justify-center text-xs mt-2 text-slate-600">
      HTTP Status Code: {{ errorCode }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { errorCode, errorMessages } from "@/services/error";
import { useRouter } from "vue-router";
import { hasSiteError } from "@/services/error";

const router = useRouter();

const error = errorMessages.find((e) => e.code == errorCode.value);
const navigate = () => {
  hasSiteError.value = false;
  router.push("/");
};
</script>

<style scoped></style>
