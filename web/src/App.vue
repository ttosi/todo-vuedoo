<template>
  <div v-loading="isPageLoading">
    <site-header />
    <div v-if="hasSiteError">
      <error-screen />
    </div>
    <div v-else>
      <div class="flex justify-center">
        <main class="relative overflow-y-auto h-[calc(100vh-128px)]">
          <router-view />
        </main>
      </div>
      <site-footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import { SiteFooter, SiteHeader } from "@/components/layout";
import ErrorScreen from "./components/ErrorScreen.vue";
import { isPageLoading } from "@/services/network";
import { hasSiteError } from "@/services/error";
</script>

<style></style>
