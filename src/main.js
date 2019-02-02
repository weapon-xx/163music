import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import pop from './plugin/pop';

Vue.config.productionTip = false;

export default function createApp() {
  const app = new Vue({
    router,
    store,
    pop,
    render: h => h(App),
  });
  return { app };
}
