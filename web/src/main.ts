import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import ElementPlus from "element-plus";
import mdiVue from "mdi-vue/v3";
import * as mdijs from "@mdi/js";
import "./assets/main.css";
import "element-plus/dist/index.css";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(ElementPlus);
app.use(mdiVue, {
  icons: mdijs,
});

app.mount("#app");
