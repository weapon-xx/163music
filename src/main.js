import Vue from 'vue';
import App from './App.vue';
import createStore from './store';
import createRouter from './router';
import pop from './plugin/pop';
import { sync } from 'vuex-router-sync'

Vue.config.productionTip = false;

export default function createApp() {
  const router = createRouter();
  const store = createStore();

  // router.beforeEach((to, from, next) => {
  //   // 校验登录态
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

  // 同步路由状态(route state)到 store
  sync(store, router)

  const app = new Vue({
    router,
    store,
    pop,
    render: h => h(App),
  });
  
  return { app, router, store };
}
