import { createApp } from 'vue';
import App from './App.vue';
const app = createApp(App);

import { createPinia } from 'pinia';
const pinia = createPinia();
app.use(pinia);

import router from './router/router';
app.use(router);

import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
loadFonts();
app.use(vuetify);

import BootstrapVue3 from 'bootstrap-vue-3';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
app.use(BootstrapVue3);

app.mount('#app');
