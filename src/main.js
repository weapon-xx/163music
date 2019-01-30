import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

Vue.config.productionTip = false;

export default function createApp() {
  const app = new Vue({
    router,
    store,
    render: h => h(App),
  });
  return { app };
}
