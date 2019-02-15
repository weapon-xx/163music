import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import App from './App.vue';
import createStore from './store';
import createRouter from './router';

// Detect environment
const isBrowser = process.env.VUE_ENV === 'client';
const VueAwesomeSwiper = isBrowser ? require('vue-awesome-swiper/dist/ssr') : undefined;
const pop = isBrowser ? require('./plugin/pop') : undefined;

if (isBrowser) {
  // load vue-awesome-swiper
  Vue.use(VueAwesomeSwiper);
  // load pop plugin
  Vue.use(pop);
}

Vue.config.productionTip = false;

export default function createApp() {
  const router = createRouter();
  const store = createStore();

  // sync router & state
  sync(store, router);

  const app = new Vue({
    router,
    store,
    render: h => h(App),
  });

  return { app, router, store };
}
