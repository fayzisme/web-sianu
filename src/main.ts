import Vue from 'vue';
import Notification from "vue-notification";

import App from './App.vue';
import router from './router';
import doCookieOperation from './helper/CookieHelper';

Vue.config.productionTip = false;

// prototyping any method to all vue instance
Vue.prototype.$doCookieOperation = doCookieOperation;

Vue.use(Notification);  // register custom plugin to vue

const app = new Vue({
  router,
  render: h => h(App),
});

app.$mount('#app');