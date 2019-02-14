import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import App from './App.vue';
import createStore from './store';
import createRouter from './router';

// Detect environment
const IS_BROWSER = process.env.VUE_ENV === 'client';
const VueAwesomeSwiper = IS_BROWSER ? require('vue-awesome-swiper/dist/ssr') : undefined;
const pop = IS_BROWSER ? require('./plugin/pop') : undefined;

if (IS_BROWSER) {
  // load vue-awesome-swiper
  Vue.use(VueAwesomeSwiper);
  // load pop plugin
  Vue.use(pop);
}

Vue.config.productionTip = false;

export default function createApp() {
  const router = createRouter();
  const store = createStore();

  // router.beforeEach((to, from, next) => {
  //   const islogin = isLogin();
  //   if (to.name === 'login') {
  //     if (islogin) {
  //       next('/');
  //     } else {
  //       next();
  //     }
  //   } else if (islogin) {
  //     next();
  //   } else {
  //     next('/login');
  //   }
  // });

  // sync router & state
  sync(store, router);

  const app = new Vue({
    router,
    store,
    render: h => h(App),
  });

  return { app, router, store };
}
