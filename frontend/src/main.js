import { createApp } from "vue";
import { createPinia } from "pinia";

import router from "./router/router";
import App from "./App.vue";

import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";

import BootstrapVue3 from "bootstrap-vue-3";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";

loadFonts();

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(BootstrapVue3);
app.use(vuetify);
app.mount("#app");
